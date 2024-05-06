import React, { useState } from "react";

interface TableProps {
  data: {
    time: string[];
    temperature_2m: number[];
  };
}

const TemperatureTable: React.FC<TableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  const pages = Math.ceil(data.time.length / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.time.slice(startIndex, endIndex);
  const currentTemperatures = data.temperature_2m.slice(startIndex, endIndex);

  const changePage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="overflow-x-auto mt-10">
        <table className="min-w-full divide-y divide-gray-600 shadow-sm">
          <thead className="bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Temperature (°C)
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-700">
            {currentData.map((time, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-400">
                  {time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {currentTemperatures[index].toFixed(2)} °C
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="py-3 flex justify-center">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          {Array.from({ length: pages }, (_, i) => (
            <a
              href="#"
              key={i}
              onClick={(e) => {
                e.preventDefault();
                changePage(i);
              }}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium 
                ${i === currentPage ? "bg-gray-700 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}
            >
              {i + 1}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};

export default TemperatureTable;
