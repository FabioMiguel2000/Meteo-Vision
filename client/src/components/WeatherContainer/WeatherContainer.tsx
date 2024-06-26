import React, { useState } from "react";
import TemperatureChart from "../Chart/TemperatureChart";
import WeatherForm from "../WeatherForm/WeatherForm";
import Dialog from "../Dialog/Dialog";
import TemperatureTable from "../Table/TemperatureTable";

interface TemperatureData {
  time: string[];
  temperature_2m: number[];
}

const SERVER_URL = "http://localhost:3001/api/v1/weather";

const WeatherContainer: React.FC = () => {
  const [temperatureData, setTemperatureData] = useState<TemperatureData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedView, setSelectedView] = useState('chart'); // This state now tracks the view mode

  const handleFormSubmit = async (
    longitude: number,
    latitude: number,
    startDate: string,
    endDate: string,
    viewMode: string // Accept viewMode as an argument
  ) => {
    const url = `${SERVER_URL}?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}`;
    const response = await fetch(url);
    const data = await response.json();
    setTemperatureData({
      time: data.temperature_data.time,
      temperature_2m: data.temperature_data.temperature_2m,
    });
    setSelectedView(viewMode); // Set the view mode for the dialog
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="w-3/4">
      <WeatherForm onSubmit={handleFormSubmit} />
      {isDialogOpen && <div className="overlay" onClick={handleClose}></div>}
      <Dialog isOpen={isDialogOpen} onClose={handleClose}>
        <div className="h-full flex flex-col justify-center">
          {temperatureData ? (
            selectedView === 'chart' ? <TemperatureChart data={temperatureData} /> : <TemperatureTable data={temperatureData} />
          ) : (
            "Loading..."
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default WeatherContainer;
