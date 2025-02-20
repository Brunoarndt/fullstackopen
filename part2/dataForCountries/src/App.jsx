import { useEffect, useState } from 'react'
import axios from 'axios'

import Search from './components/Search'
import Countries from './components/Countries'
import './App.css'

function App() {
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState([]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  }

  useEffect(() => {
    if(search){
      axios
        .get('https://restcountries.com/v3.1/all')
        .then(response => {
          setCountry(response.data)
        })
        .catch(error => console.error("Error searching for countries", error));
    }
    
  },[search])

  return (
    <>
      <Search search={search} handleSearchChange={handleSearchChange}/>
      <Countries country={country} search={search}/>
    </>
  )
}

export default App
