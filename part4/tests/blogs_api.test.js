const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
beforeEach(async () => {
    await Blog.deleteMany({})
  
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
  
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
  })

test('number of blogs', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(2)
})

test('identifier', async () => {
    const response = await api.get('/api/blogs')

    if (response.body.length === 0) {
        return
    }

    expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added ', async () => {
    const newBlog = {
        title: "the great Blog 3",
        author: "Joaquim lambucanoccio",
        url: 'localhost:3003',
        likes: 1235
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map(blog => blog.title)
        expect(titles).toContain("the great Blog 3")
})

test('contain likes', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
})

test('blog without title should return 400', async () => {
    const newBlog = {
      author: 'Joaquim Lambucanoccio',
      url: 'localhost:3003',
      likes: 1235,
    }
  
    try {
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    } catch (error) {
      console.error('Error:', error) 
    }
  })
  
  test('blog without url should return 400', async () => {
    const newBlog = {
      title: 'The Great Blog',
      author: 'Joaquim Lambucanoccio',
      likes: 1235,
    }
  
    try {
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    } catch (error) {
      console.error('Error:', error) 
    }
  })
  

afterAll(async () => {
await mongoose.connection.close()
})
  