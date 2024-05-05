module Api
    module V1
      class WeatherController < ApplicationController
        def show
          latitude = params[:latitude]
          longitude = params[:longitude]
          start_date = params[:start_date]
          end_date = params[:end_date]

          puts "Received parameters: latitude=#{latitude}, longitude=#{longitude}, start_date=#{start_date}, end_date=#{end_date}"
  
          render json: {
            status: 'Success',
            message: 'Weather data fetched successfully',
            latitude: latitude,
            longitude: longitude,
            start_date: start_date,
            end_date: end_date
          }, status: :ok
        end
      end
    end
  end