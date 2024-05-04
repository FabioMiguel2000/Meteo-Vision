import React, { useState } from 'react';
import TemperatureChart from '../Chart/TemperatureChart';
import WeatherForm from '../WeatherForm/WeatherForm';

interface TemperatureData {
    time: string[];
    temperature_2m: number[];
}

const WeatherContainer: React.FC = () => {
    const [temperatureData, setTemperatureData] = useState<TemperatureData | null>(null);

    const handleFormSubmit = async (country: string, city: string, startDate: string, endDate: string) => {
        // Assuming you have an API endpoint that accepts these parameters
        const url = `https://ensemble-api.open-meteo.com/v1/ensemble?latitude=52.52&longitude=13.41&hourly=temperature_2m&models=icon_seamless`;
        const response = await fetch(url);
        const data = await response.json();
        setTemperatureData({
            time: data.hourly.time,
            temperature_2m: data.hourly.temperature_2m
        });
    };


    return (
        <div className='w-full m-auto'>
            <WeatherForm onSubmit={handleFormSubmit}/>
            {temperatureData ? <TemperatureChart data={temperatureData} /> : <p>Loading...</p>}
        </div>
    );
};

export default WeatherContainer;