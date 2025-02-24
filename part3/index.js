const express = require('express')
const app = express() 
const PORT = 3001

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

const date = new Date()

app.use(express.json())


app.post('/api/persons/:id', (request, response) => {
    const body = request.body

    if(!body.name || !body.number){
        return response.status(400).json({
            error: 'error content missing'
        })
    }

    if(persons.some(persons => persons.name === body.name)){
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: Math.floor(Math.random() * 101),
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(person)

    response.json(person)
})

app.get('/info', (request, response) => {
    response.send(`<h1>Phonebook has info for ${persons.length} people</h1> <h1>${date}</h1>`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(persons => persons.id === id)
    if(person){
        response.json(person)
    }else {
        console.log("error finding the id");
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(persons => persons.id != id)

    response.status(204).end()
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
})