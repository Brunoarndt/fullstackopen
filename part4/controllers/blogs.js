const http = require('http')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if(authorization && authorization .startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
  .find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
})

blogsRouter.put('/:id', async (request, response) => {
  const {title, author, url, likes} = request.body

  const blog = new Blog({title, author, url, likes})

  const updateBlog = await Blog.findByIdAndUpdate(request.params.id, {title, author, url, likes}, {new: true, runValidators: true})
  if (!updateBlog) {
    return response.status(404).json({ error: 'Blog not found' })
  }
  response.json(updateBlog)
})

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body

  if (!title || !url) {
    return response.status(400).json({ error: 'Title and URL are required' })
  }

  let decodedToken
  try {
    const token = getTokenFrom(request)
    decodedToken = jwt.verify(token, process.env.SECRET)
  } catch (error) {
    return response.status(401).json({ error: 'Invalid or expired token' })
  }

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id) 
  if (!user) {
    return response.status(401).json({ error: 'User not found' })
  }

  const blog = new Blog({
    title, 
    author, 
    url, 
    likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})


blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter