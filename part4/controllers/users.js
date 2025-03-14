const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { error } = require('../utils/logger')

usersRouter.post('/', async (request, response, next) => {
    try{
        const {username, name, password} = request.body

        if(!password || password.lenght < 3){
            return response.status(400).json({error: 'Password must be at least 3 characters long'})
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            username,
            name,
            passwordHash,
        })

        const savedUser = await user.save()

        response.status(201).json(savedUser)
    }catch(error){
        if(error.name === 'MongoServerError' && error.code === 11000){
            response.status(400).json({error: 'Username must be unique'})
        }
        else{
            next(error)
        }
    }
    
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
  })

module.exports = usersRouter