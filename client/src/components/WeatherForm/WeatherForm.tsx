// src/components/TemperatureForm.tsx
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { ICountry, ICity, Country, City } from 'country-state-city';

interface Props {
    onSubmit: (country: string, city: string, startDate: string, endDate: string) => void;
}

const WeatherForm: React.FC<Props> = ({ onSubmit }) => {
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [cities, setCities] = useState<ICity[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        setCountries(Country.getAllCountries());
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            setCities(City.getCitiesOfCountry(selectedCountry) as ICity[]);
        }
    }, [selectedCountry]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleCountryChange = (option: any) => {
        setSelectedCountry(option.value);
        setSelectedCity(''); // Reset city when country changes
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleCityChange = (option: any) => {
        setSelectedCity(option.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(selectedCountry, selectedCity, startDate, endDate);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="country">Country:</label>
                <Select
                    id="country"
                    options={countries.map((country) => ({
                        value: country.isoCode,
                        label: country.name
                    }))}
                    onChange={handleCountryChange}
                />
            </div>
            <div>
                <label htmlFor="city">City:</label>
                <Select
                    id="city"
                    options={cities.map((city) => ({
                        value: city.name,
                        label: city.name
                    }))}
                    onChange={handleCityChange}
                    isDisabled={!selectedCountry}
                />
            </div>
            <div>
                <label htmlFor="start-date">Start Date:</label>
                <input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="end-date">End Date:</label>
                <input
                    id="end-date"
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                />
            </div>
            <button type="submit">Show Temperature</button>
        </form>
    );
};

export default WeatherForm;