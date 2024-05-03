import React, { useState, useEffect } from 'react';
import TemperatureChart from '../Chart/TemperatureChart';

const WeatherContainer: React.FC = () => {
    const [temperatureData, setTemperatureData] = useState<{ time: string[], temperature_2m: number[] } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://ensemble-api.open-meteo.com/v1/ensemble?latitude=52.52&longitude=13.41&hourly=temperature_2m&models=icon_seamless');
            const data = await response.json();
            if (data && data.hourly) {
                setTemperatureData({
                    time: data.hourly.time,
                    temperature_2m: data.hourly.temperature_2m
                });
            }
        };

        fetchData();
    }, []);

    return (
        <div className='w-full m-auto'>
            {temperatureData ? <TemperatureChart data={temperatureData} /> : <p>Loading...</p>}
        </div>
    );
};

export default WeatherContainer;