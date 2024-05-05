module Api
  module V1
    class WeatherController < ApplicationController
      before_action :validate_params

      def show
        latitude = params[:latitude]
        longitude = params[:longitude]
        start_date = params[:start_date]
        end_date = params[:end_date]
        puts "Received parameters: latitude=
        #{latitude}, longitude=#{longitude},
        start_date=#{start_date}, end_date=#{end_date}"
        render json: {
          status: 'Success',
          message: 'Weather data fetched successfully',
          latitude: latitude,
          longitude: longitude,
          start_date: start_date,
          end_date: end_date
        }, status: :ok
      end

      private

      def validate_params
        puts 'Validating parameters...'
        required = %i[latitude longitude start_date end_date]
        puts "Received parameters: #{params}"
        missing = required.select { |param| params[param].blank? }
        return if missing.empty?

        render json: {
          status: 'Error',
          message: "Missing required parameters: #{missing.join(', ')}"
        }, status: :bad_request
        nil
      end
    end
  end
end
