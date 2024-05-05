import React, { useState } from "react";
import TemperatureChart from "../Chart/TemperatureChart";
import WeatherForm from "../WeatherForm/WeatherForm";

interface TemperatureData {
  time: string[];
  temperature_2m: number[];
}

const SERVER_URL = "http://localhost:3001/api/v1/weather";

const WeatherContainer: React.FC = () => {
  const [temperatureData, setTemperatureData] =
    useState<TemperatureData | null>(null);

  const handleFormSubmit = async (
    longitude: number,
    latitude: number,
    startDate: string,
    endDate: string
  ) => {
    const url = `${SERVER_URL}?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}`;
    const response = await fetch(url);
    const data = await response.json();
    setTemperatureData({
      time: data.temperature_data.time,
      temperature_2m: data.temperature_data.temperature_2m,
    });
  };

  return (
    <div className="w-3/4 m-auto">
      <WeatherForm onSubmit={handleFormSubmit} />
      <div className="mt-5">
        {temperatureData ? (
          <TemperatureChart data={temperatureData} />
        ) : (
          <TemperatureChart data={{ time: [], temperature_2m: [] }} />
        )}
      </div>
    </div>
  );
};

export default WeatherContainer;
