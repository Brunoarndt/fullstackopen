const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('number of blogs', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(0)
})

test('identifier', async () => {
    const response = await api.get('/api/blogs')

    if (response.body.length == 0) {
        return 0
    }

    expect(response.body[0].id.toBeDefined())
})

afterAll(async () => {
await mongoose.connection.close()
})
  