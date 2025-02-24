const express = require('express')
const app = express() 

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

let contacts = persons.length
const date = new Date()

app.use(express.json())

app.get('/info', (request, response) => {
    response.send(`<h1>Phonebook has info for ${persons.length} people</h1> <h1>${date}</h1>`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log('server running on port 3001');
    
})