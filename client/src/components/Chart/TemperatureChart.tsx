// src/components/TemperatureChart.tsx
import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { ChartData, ChartOptions } from "chart.js";

interface TemperatureChartProps {
  data: {
    time: string[];
    temperature_2m: number[];
  };
}

function formatDateForTooltip(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }) + ' ' + date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatDateForAxis(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  });
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({ data }) => {
  const { time, temperature_2m } = data;

  const labels = time.map((t, index) => {
    // Check if the day has changed compared to the previous time entry
    if (index === 0 || formatDateForAxis(time[index - 1]) !== formatDateForAxis(t)) {
      return formatDateForAxis(t); // Show the day if it's a new one
    }
    return ''; // Don't show the day if it's the same
  });

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          title: function(context) {
            return formatDateForTooltip(time[context[0].dataIndex]);
          },
          label: function(context) {
            return `Temperature: ${context.raw} °C`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
        }
      },
      y: {
        title: {
          display: true,
          text: "Temperature (°C)",
        },
        beginAtZero: true,
      },
    },
  };

  const chartData: ChartData<"line", number[], string> = {
    labels,
    datasets: [
      {
        label: "Temperature",
        data: temperature_2m,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Line data={chartData} options={options} />;
};

export default TemperatureChart;
