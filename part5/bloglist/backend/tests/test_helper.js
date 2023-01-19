const User = require('../models/user')
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'blog1',
    author: 'author1',
    url: 'url1',
    likes: 1
  },
  {
    title: 'blog2',
    author: 'author2',
    url: 'url2',
    likes: 2
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const userObject = {
  "username": "root",
  "name": "Superuser",
  "password": "admin"
}

module.exports = { initialBlogs, usersInDb, blogsInDb, userObject }