class CreateWeatherData < ActiveRecord::Migration[7.1]
  def change
    create_table :weather_data do |t|
      t.float :latitude
      t.float :longitude
      t.date :start_date
      t.date :end_date
      t.json :temperature_data

      t.timestamps
    end
  end
end
