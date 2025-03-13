const mongoose = require('mongoose')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

describe('Blog API tests', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
    })

    describe('Fetching blogs', () => {
        test('returns the correct number of blogs', async () => {
            const response = await api.get('/api/blogs')
            expect(response.body).toHaveLength(helper.initialBlogs.length)
        })

        test('blogs have an identifier field named id', async () => {
            const response = await api.get('/api/blogs')
            if (response.body.length > 0) {
                expect(response.body[0].id).toBeDefined()
            }
        })
    })

    describe('Adding a new blog', () => {
        test('succeeds with valid data', async () => {
            const newBlog = {
                title: "The Great Blog 3",
                author: "Joaquim Lambucanoccio",
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
            expect(titles).toContain("The Great Blog 3")
        })

        test('fails with status code 400 when title is missing', async () => {
            const newBlog = {
                author: 'Joaquim Lambucanoccio',
                url: 'localhost:3003',
                likes: 1235,
            }

            await api.post('/api/blogs').send(newBlog).expect(400)
        })

        test('fails with status code 400 when URL is missing', async () => {
            const newBlog = {
                title: 'The Great Blog',
                author: 'Joaquim Lambucanoccio',
                likes: 1235,
            }

            await api.post('/api/blogs').send(newBlog).expect(400)
        })
    })

    describe('Updating a blog', () => {
        test('succeeds with valid data', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToUpdate = blogsAtStart[0]

            const updatedBlogData = {
                title: 'Updated Blog Title',
                author: 'Updated Author',
                url: 'http://updated-url.com',
                likes: 999
            }

            const response = await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .send(updatedBlogData)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            expect(response.body.title).toBe(updatedBlogData.title)
            expect(response.body.author).toBe(updatedBlogData.author)
            expect(response.body.url).toBe(updatedBlogData.url)
            expect(response.body.likes).toBe(updatedBlogData.likes)

            const blogsAtEnd = await helper.blogsInDb()
            const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)

            expect(updatedBlog).toBeDefined()
            expect(updatedBlog.title).toBe(updatedBlogData.title)
            expect(updatedBlog.author).toBe(updatedBlogData.author)
            expect(updatedBlog.url).toBe(updatedBlogData.url)
            expect(updatedBlog.likes).toBe(updatedBlogData.likes)
        })
    })

    describe('Deleting a blog', () => {
        test('succeeds with a status code 204 if id is valid', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]
    
            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204)
    
            const blogsAtEnd = await helper.blogsInDb()
    
            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    
            const titles = blogsAtEnd.map(t => t.title)
            assert(!titles.includes(blogToDelete.title))
        })
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})