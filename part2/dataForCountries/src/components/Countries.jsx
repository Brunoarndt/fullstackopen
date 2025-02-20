import React, { useEffect, useState } from 'react'


const Countries = ({ country, search }) => {

    const [selectedCountry, setSelectedCountry] = useState(null)

    const filteredCountries = country.filter((c) => 
        c.name.common.toLowerCase().includes(search.toLowerCase())
    )

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
                <h1> {country.flag} </h1>
            </>
            );
    }
    
    if (filteredCountries.length > 10) {
        return <p>Too many matches, specify another filter</p>;
      }


  return (
    <div>
        {
        filteredCountries.length === 1
            ? renderCountryDetails(filteredCountries[0])
            : filteredCountries.map((c) => (
                <div key={c.name.common}>
                <p>{c.name.common}</p>
                <button onClick={() => setSelectedCountry(c.name.common)}>Show</button>
                </div>
            ))
        }

        {selectedCountry &&
        renderCountryDetails(filteredCountries.find((c) => c.name.common === selectedCountry))} //only execute renderCountryDetails if selectedCountry=!null

    </div>
  )
}

export default Countries