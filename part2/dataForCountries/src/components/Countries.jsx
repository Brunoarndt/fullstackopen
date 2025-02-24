/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import axios from 'axios';

const Countries = ({ country, search }) => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedCountryData, setSelectedCountryData] = useState(null);
    const [weather, setWeather] = useState(null);

    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    const filteredCountries = country.filter((c) => 
        c.name.common.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        if (selectedCountry) {
            const countryData = country.find((c) => c.name.common === selectedCountry);
            setSelectedCountryData(countryData || null);
        }
    }, [selectedCountry, country]);

    useEffect(() => {
        if (selectedCountryData && apiKey) {
            axios
                .get(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCountryData.capital},${selectedCountryData.cca2}&appid=${apiKey}&units=metric`)
                .then((response) => {
                    setWeather(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching weather data:", error);
                    setWeather(null);
                });
        }
    }, [selectedCountryData, apiKey]); 

    const renderCountryDetails = (country) => {
        return (
            <>
                <h1>{country.name.common}</h1>
                <p>Capital: {country.capital}</p>
                <p>Area: {country.area}</p>
                <h4>Languages</h4>
                <ul>
                    {Object.values(country.languages).map((lang, index) => (
                        <li key={index}>{lang}</li>
                    ))}
                </ul>
                <h1>{country.flag}</h1>
                <h1>Weather in {country.capital}</h1>
                {weather ? (
                    <>
                        <p>Temperature: {weather.main.temp}°C</p>
                        <p>Weather: {weather.weather[0].description}</p>
                    </>
                ) : (
                    <p>Loading weather...</p>
                )}
            </>
        );
    };

    if (filteredCountries.length > 10) {
        return <p>Too many matches, specify another filter</p>;
    }

    return (
        <div>
            {filteredCountries.length === 1
                ? renderCountryDetails(filteredCountries[0])
                : filteredCountries.map((c) => (
                    <div key={c.name.common}>
                        <p>{c.name.common}</p>
                        <button onClick={() => setSelectedCountry(c.name.common)}>Show</button>
                    </div>
                ))
            }

            {filteredCountries.length !== 1  && selectedCountryData && renderCountryDetails(selectedCountryData)}
        </div>
    );
};

export default Countries;
