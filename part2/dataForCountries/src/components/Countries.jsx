import React from 'react'

const Countries = ({ country, search }) => {

    const filteredCountries = country.filter((c) => 
        c.name.common.toLowerCase().includes(search.toLowerCase())
    )

    if (filteredCountries.length > 10) {
        return <p>Too many matches, specify another filter</p>;
      }
    if (filteredCountries.length == 1) {
        const countryData = filteredCountries[0];

        return (
        <>
            <h1>{countryData.name.common}</h1>
            <p>Capital: {countryData.capital}</p>
            <p>Area: {countryData.area}</p>
            <h4>Languages</h4>
            <ul>
            {Object.values(countryData.languages).map((lang, index) => (
                <li key={index}>{lang}</li>
            ))}
            </ul>
            <h1> {countryData.flag} </h1>
        </>
        );
    }

  return (
    <div>
        {
        filteredCountries.map((c) => {
            return(
                <div key={c.name.common}>
                    <p>
                        {c.name.common}
                    </p>
                </div>
            )
        })}
    </div>
  )
}

export default Countries