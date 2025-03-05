import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
//dotenv imported at model
import Person from './models/person.js'


const app = express()
const PORT = process.env.PORT

let persons = []

const date = new Date()

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if(error.name === 'ValidationError'){
        return response.status(400).json({error: error.message})
    }
  
    next(error)
}

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('build'))

morgan.token('body', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if(!body.name || !body.number){
        return response.status(400).json({
            error: 'error content missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })
    

    person.save().then(savedPerson => response.json(savedPerson))
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const {name, number} = request.body

    Person.findByIdAndUpdate(request.params.id, {name, number}, {new: true, runValidators: true, context: 'query'})
        .then(person => {
            response.json(person)
        })
        .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
    Person.find().then((person) => {
        response.send(`<h1>Phonebook has info for ${person.length} people</h1> <h1>${date}</h1>`)
    })
    .catch(error => next(error)) 
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
        response.json(person)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    
    Person.findById(id).then((person) => {
        response.json(person)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
})