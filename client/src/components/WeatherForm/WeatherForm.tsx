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
    if (!existStates){
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
      <div>
        <label htmlFor="country">Country:</label>
        <Select
          id="country"
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
      <div>
        <label htmlFor="state">State:</label>
        <Select
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
      <div>
        <label htmlFor="city">City:</label>
        <Select
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
      <div>
        <label htmlFor="start-date">Start Date:</label>
        <input
          id="start-date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="end-date">End Date:</label>
        <input
          id="end-date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <button type="submit">Show Temperature</button>
    </form>
  );
};

export default WeatherForm;
