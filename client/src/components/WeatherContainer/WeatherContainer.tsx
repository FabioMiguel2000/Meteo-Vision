import React, { useState } from 'react';
import TemperatureChart from '../Chart/TemperatureChart';
import WeatherForm from '../WeatherForm/WeatherForm';

interface TemperatureData {
    time: string[];
    temperature_2m: number[];
}

const OPEN_METEO_URL='https://ensemble-api.open-meteo.com/v1/ensemble';

const WeatherContainer: React.FC = () => {
    const [temperatureData, setTemperatureData] = useState<TemperatureData | null>(null);

    const handleFormSubmit = async (longitude: number, latitude: number, startDate: string, endDate: string) => {
        const url = `${OPEN_METEO_URL}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&start_date=${startDate}&end_date=${endDate}&models=icon_seamless`;
        const response = await fetch(url);
        const data = await response.json();
        setTemperatureData({
            time: data.hourly.time,
            temperature_2m: data.hourly.temperature_2m
        });
    };


    return (
        <div className='w-3/4 m-auto '>
            <WeatherForm onSubmit={handleFormSubmit}/>
            {temperatureData ? <TemperatureChart data={temperatureData} /> : <p>Loading...</p>}
        </div>
    );
};

export default WeatherContainer;