import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
//dotenv imported at model
import Person from './models/person.js'


const app = express()
const PORT = process.env.PORT

let persons = []

const date = new Date()

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('build'))

morgan.token('body', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

app.post('/api/persons', (request, response) => {
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

    const person = new Person({
        name: body.name,
        number: body.number,
    })
    

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

app.get('/info', (request, response) => {
    response.send(`<h1>Phonebook has info for ${persons.length} people</h1> <h1>${date}</h1>`)
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
        response.json(person)
    })
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
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => console.log('error deleting'))
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
})