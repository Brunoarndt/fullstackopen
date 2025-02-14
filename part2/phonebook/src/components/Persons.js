import React from 'react'

const Persons = ({ persons, filter, remove }) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((person) => {
          return (
            <div key={person.id}>
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