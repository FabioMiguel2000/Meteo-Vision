// src/components/TemperatureForm.tsx
import React, { useState, useEffect } from "react";
import {
  ICountry,
  IState,
  ICity,
  Country,
  State,
  City,
} from "country-state-city";

interface Props {
  onSubmit: (
    longitude: number,
    latitude: number,
    startDate: string,
    endDate: string
  ) => void;
}

const WeatherForm: React.FC<Props> = ({ onSubmit }) => {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [existStates, setExistStates] = useState<boolean>(true);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [longitude, setLongitude] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    setExistStates(true);
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry) as IState[]);
      setCities([]);
      if (State.getStatesOfCountry(selectedCountry).length === 0) {
        setExistStates(false);
      }
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      setExistStates(true);
      setCities(
        City.getCitiesOfState(selectedCountry, selectedState) as ICity[]
      );
    }
  }, [selectedState]);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
    setSelectedState("");
    setSelectedCity("");
    const selectedOption = countries.find(
      (country) => country.isoCode === event.target.value
    );
    if (selectedOption) {
      setLongitude(Number(selectedOption.longitude));
      setLatitude(Number(selectedOption.latitude));
    }
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(event.target.value);
    setSelectedCity("");
    const selectedOption = states.find(
      (state) => state.isoCode === event.target.value
    );
    if (selectedOption) {
      setLongitude(Number(selectedOption.longitude));
      setLatitude(Number(selectedOption.latitude));
    }
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = cities.find(
      (city) => city.name === event.target.value
    );
    setSelectedCity(event.target.value);
    if (selectedOption) {
      setLongitude(Number(selectedOption.longitude));
      setLatitude(Number(selectedOption.latitude));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(longitude, latitude, startDate, endDate);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full grid grid-cols-6 gap-4">
        <div className="flex flex-col items-start gap-1 col-span-2">
          <label htmlFor="country" className="mb-1 text-sm font-bold">
            Country:
          </label>
          <select
            id="country"
            className="w-full p-2 border bg-white border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedCountry}
            onChange={handleCountryChange}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.isoCode} value={country.isoCode}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col items-start gap-1 col-span-2">
          <label htmlFor="state" className="mb-1 text-sm font-bold">
            State:
          </label>
          <select
            id="state"
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              selectedCountry
                ? "bg-white text-gray-700 border-gray-300"
                : "bg-gray-100 text-gray-400 border-gray-200"
            }`}
            value={selectedState}
            onChange={handleStateChange}
            disabled={!selectedCountry}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col items-start gap-1 col-span-2">
          <label htmlFor="city" className="mb-1 text-sm font-bold">
            City:
          </label>
          <select
            id="city"
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              selectedState || !existStates
                ? "bg-white text-gray-700 border-gray-300"
                : "bg-gray-100 text-gray-400 border-gray-200"
            }`}
            value={selectedCity}
            onChange={handleCityChange}
            disabled={!selectedState && existStates}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col items-start col-span-3 gap-1">
          <label className="text-sm font-bold" htmlFor="start-date">
            Start Date:
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md text-gray-600 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start col-span-3 gap-1">
          <label className="text-sm font-bold" htmlFor="end-date">
            End Date:
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md text-gray-600 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button
          className="flex w-full col-span-6 mt-6 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          type="submit"
          disabled={
            !(
              longitude !== 0 &&
              latitude !== 0 &&
              startDate !== "" &&
              endDate !== ""
            )
          }
        >
          Show Temperature
        </button>
      </div>
    </form>
  );
};

export default WeatherForm;
