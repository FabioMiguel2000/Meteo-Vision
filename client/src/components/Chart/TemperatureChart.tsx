// src/components/TemperatureChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { ChartData, ChartOptions } from 'chart.js';

interface TemperatureChartProps {
    data: {
        time: string[];
        temperature_2m: number[];
    };
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({ data }) => {
    const options: ChartOptions<"line"> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Temperature (°C)'
                },
                beginAtZero: true,
            }
        }
    };

    const chartData: ChartData<"line", number[], string> = {
        labels: data.time,
        datasets: [
            {
                label: 'Temperature',
                data: data.temperature_2m,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return <Line data={chartData} options={options} />;
};

export default TemperatureChart;
