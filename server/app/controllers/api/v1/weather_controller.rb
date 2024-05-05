module Api
  module V1
    class WeatherController < ApplicationController
      before_action :validate_params

      def show
        @weather_data = WeatherData.find_by(
          latitude: params[:latitude],
          longitude: params[:longitude],
          start_date: params[:start_date],
          end_date: params[:end_date]
        )

        if @weather_data
          render json: @weather_data
        else
          fetch_and_store_weather_data
        end
      end

      private

      def validate_params
        required = %i[latitude longitude start_date end_date]
        missing = required.select { |param| params[param].blank? }
        return if missing.empty?

        render json: {
          status: 'Error',
          message: "Missing required parameters: #{missing.join(', ')}"
        }, status: :bad_request
        nil
      end

      def fetch_and_store_weather_data
        puts 'Fetching weather data from API'
        response = RestClient.get 'https://ensemble-api.open-meteo.com/v1/ensemble', {
          params: {
            latitude: params[:latitude],
            longitude: params[:longitude],
            hourly: 'temperature_2m',
            start_date: params[:start_date],
            end_date: params[:end_date],
            models: 'icon_seamless'
          }
        }
        data = JSON.parse(response.body)
        puts 'Storing weather data in database'

        @weather_data = WeatherData.create!(
          latitude: params[:latitude],
          longitude: params[:longitude],
          start_date: params[:start_date],
          end_date: params[:end_date],
          temperature_data: data['hourly']
        )
        render json: @weather_data
      end
    end
  end
end
