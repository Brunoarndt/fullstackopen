import React from 'react'

const Persons = ({ persons, filter, remove }) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons
        .filter((person) => {
          if(!person || !person.name){
            console.warn('Invalid value in persons:', persons)
            return false
          }
          return person.name.toLowerCase().includes(filter.toLowerCase())
        })
        .map((person) => {
          return (
            <div key={person.name}>
              <p>
              {person.name} {person.number}
            </p>
            <button onClick={() => remove(person.id)}>delete</button>
            </div>
          );
        })}
    </>
  )
}

export default Persons