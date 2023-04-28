import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => { 
    setNewName(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    if(persons.some((person) => person.name.toLowerCase() === newName.toLowerCase())){
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      return;
    }
    const personObject = {
      name: newName,
    }

    setPersons(persons.concat(personObject))
    setNewName("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => {
        return <p key={person.name}>{person.name}</p>;
      })}
    </div>
  )
}

export default App