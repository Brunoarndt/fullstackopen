const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
    title: "the great Blog",
    author: "Joaquim lambuco",
    url: 'localhost:3000',
    likes: 1234
},
{   title: "the great Blog 2",
    author: "Joaquim lambucano",
    url: 'localhost:3001',
    likes: 1235
}]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb, usersInDb,
}