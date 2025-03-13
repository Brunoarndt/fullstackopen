const http = require('http')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
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

  const blog = new Blog({title, author, url, likes})

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter