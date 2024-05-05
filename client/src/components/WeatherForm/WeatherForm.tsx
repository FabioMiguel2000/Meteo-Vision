// src/components/TemperatureForm.tsx
import React, { useState, useEffect } from "react";
import Select from "react-select";
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
  const [selectedCountryIsoCode, setSelectedCountryIsoCode] =
    useState<string>("");
  const [existStates, setExistStates] = useState<boolean>(true);
  const [selectedStateIsoCode, setSelectedStateIsoCode] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [longitude, setLongitude] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (selectedCountryIsoCode) {
      setStates(State.getStatesOfCountry(selectedCountryIsoCode) as IState[]);
      if (State.getStatesOfCountry(selectedCountryIsoCode).length === 0) {
        setExistStates(false);
      }
    }
  }, [selectedCountryIsoCode]);

  useEffect(() => {
    if (!existStates) {
      setCities(City.getCitiesOfCountry(selectedCountryIsoCode) as ICity[]);
      return;
    }

    if (selectedStateIsoCode) {
      setCities(
        City.getCitiesOfState(
          selectedCountryIsoCode,
          selectedStateIsoCode
        ) as ICity[]
      );
    }
  }, [selectedStateIsoCode, selectedCountryIsoCode, existStates]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCountryChange = (option: any) => {
    setSelectedCountry(option.value);
    setSelectedCountryIsoCode(option.isoCode);
    setExistStates(true);
    setSelectedStateIsoCode("");
    setSelectedState("");
    setSelectedCity("");
    setLatitude(option.latitude);
    setLongitude(option.longitude);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleStateChange = (option: any) => {
    setExistStates(true);
    setSelectedState(option.value);
    setSelectedStateIsoCode(option.isoCode);
    setLatitude(option.latitude);
    setLongitude(option.longitude);
    setSelectedCity("");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCityChange = (option: any) => {
    setSelectedCity(option.value);
    setLatitude(option.latitude);
    setLongitude(option.longitude);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(longitude, latitude, startDate, endDate);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full grid grid-cols-6 gap-4">
        <div className="flex flex-col items-start gap-1 col-span-2">
          <label className="text-sm font-bold"
          htmlFor="country">Country:</label>
          <Select
            className="w-full text-gray-900 text-start"
            placeholder="Select a country"
            id="country"
            aria-label="Country"
            options={countries.map((country) => ({
              value: country.name,
              label: country.name,
              isoCode: country.isoCode,
              latitude: country.latitude,
              longitude: country.longitude,
            }))}
            value={
              selectedCountry
                ? { value: selectedCountry, label: selectedCountry }
                : null
            }
            onChange={handleCountryChange}
          />
        </div>
        <div className="flex flex-col items-start gap-1 col-span-2">
          <label className="text-sm font-bold"
          htmlFor="state">State:</label>
          <Select
            className="w-full text-gray-900 text-start"
            placeholder="Select a state"
            id="state"
            options={states.map((state) => ({
              value: state.name,
              label: state.name,
              isoCode: state.isoCode,
              latitude: state.latitude,
              longitude: state.longitude,
            }))}
            value={
              selectedState
                ? { value: selectedState, label: selectedState }
                : null
            }
            onChange={handleStateChange}
            isDisabled={!selectedCountry}
          />
        </div>
        <div className="flex flex-col items-start gap-1 col-span-2">
          <label className="text-sm font-bold"
          htmlFor="city">City:</label>
          <Select
            className="w-full text-gray-900 text-start"
            placeholder="Select a city"
            id="city"
            options={cities.map((city) => ({
              value: city.name,
              label: city.name,
              latitude: city.latitude,
              longitude: city.longitude,
            }))}
            value={
              selectedCity ? { value: selectedCity, label: selectedCity } : null
            }
            onChange={handleCityChange}
            isDisabled={!selectedState && existStates}
          />
        </div>
        <div className="flex flex-col items-start col-span-3 gap-1">
          <label className="text-sm font-bold"
          htmlFor="start-date">Start Date:</label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md text-gray-600 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start col-span-3 gap-1">
          <label className="text-sm font-bold"
          htmlFor="end-date">End Date:</label>
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
