import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '00-00000-0000' 
  }]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => { 
    setNewName(event.target.value)
  }
  const handleNumberChange = (e) => {
      setNewNumber(e.target.value)
    }
  const handleSubmit = (event) => {
    event.preventDefault()
    if(persons.some((person) => person.name.toLowerCase() === newName.toLowerCase())){
      alert(`${newName} is already added to phonebook`)
      setNewName("")
      setNewNumber("")
      return;
    }
    const personObject = {name: newName, number: newNumber}

    setPersons(persons.concat(personObject))
    setNewName("")
    setNewNumber("")
  }

  


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => {
        return <p key={person.name}>{person.name} {person.number} </p>;
      })}
    </div>
  )
}

export default App