import { useEffect, useState } from "react";

import personService from "./services/persons";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [successfulMessage, setSuccessfulMessage] = useState(null)

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const removePerson = (id) =>{
    const deletedPerson = persons.find(n => n.id === id)
    const result = window.confirm(`Delete ${deletedPerson.name}?`)
  
    if(result === true ){
      personService
            .remove(id)
            .then(() => {
              setPersons(persons.filter(person => person.id !== id))
            })
            .catch(error => {
              console.log('Error deleting:', error);
            })
          }
    }
    
  const addPerson = (event) => {
    event.preventDefault();

    const existedPerson = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase()); 

    if (existedPerson) { 
      const result = window.confirm(`${newName} is already added to phonebook, replace the older number with a new one?`)
      
      if(result){        
        const changedNumber = {...existedPerson, number: newNumber}

        personService
        .update(existedPerson.id, changedNumber)
        .then(returnedPerson => {
          setPersons(persons.map(person =>
            person.id === existedPerson.id ? returnedPerson : person
          ))
          setNewName("");
          setNewNumber("");
          setSuccessfulMessage(`Changed ${newName} number`)
          setTimeout(() => {
            setSuccessfulMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log('Error updating:', error);
        })
      }
      else{
        setNewName("");
        setNewNumber(""); 
      }
      
      return;
    }
    

    const personObject = { name: newName, number: newNumber};
    
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(personObject));
        setNewName("");
        setNewNumber("");
      })
    
      setSuccessfulMessage(`Added ${newName}`)
      setTimeout(() => {
        setSuccessfulMessage(null)
      }, 5000)
  };

  useEffect(() => {
    personService
      .getAll()
      .then(initialPerson => {
        console.log('Data loaded from backend', initialPerson);
        
        setPersons(initialPerson)
      })
      .catch(error => {
        console.log('Error fetching contacts', error);
        
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successfulMessage}></Notification>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} remove={removePerson} filter={filter} />
    </div>
  );
};

export default App;