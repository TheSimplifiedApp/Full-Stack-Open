const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
let token = ''

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('admin', 10)
  const user = new User({
    username: 'root',
    name: 'Superuser',
    passwordHash
  })
  await user.save()

  const userForToken = { username: user.username, id: user.id }
  token = jwt.sign(userForToken, process.env.SECRET)

  await Blog.deleteMany({})
  const promiseArray = helper.initialBlogs.map(blog =>
    api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blog)
  )
  await Promise.all(promiseArray)
})


describe('4.8: verify that the blog list application returns the correct amount of blog posts in the JSON format.', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('app returns the correct amount of blog posts', async () => {
    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length)
  })
})

describe('4.9: verifies that the unique identifier property of the blog posts is named id.', () => {
  test('id property exists in a random blog in response', async () => {
    const response = await api.get('/api/blogs')
    const randomIndex = Math.floor(Math.random() * response.body.length)
    expect(response.body[randomIndex].id).toBeDefined()
  })
})

describe('4.10: verifies that making an HTTP POST request to the /api/blogs URL successfully creates a new blog post.', () => {
  test('successfully creates a new blog post with token', async () => {
    const newBlog = {
      title: 'Blog 3',
      author: 'author 3',
      url: 'url 3',
      likes: 30
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
    const titles = blogs.map(blog => blog.title)
    expect(titles).toContain('Blog 3')
  })

  test('4.23: adding a blog fails with the proper status code 401 Unauthorized if a token is not provided.', async () => {
    const newBlog = {
      title: 'Blog 3',
      author: 'author 3',
      url: 'url 3',
      likes: 30
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length)
  })
})

describe('4.11: verifies that if the likes property is missing from the request, it will default to the value 0.', () => {
  test('default value for likes is 0', async () => {
    const newBlog = {
      title: 'Blog 4',
      author: 'author 4',
      url: 'url 4'
    }
    const response = await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })
})

describe('4.12: if the title or url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request.', () => {
  test('title missing', async () => {
    const titleMissing = {
      author: 'author 4',
      url: 'url 4'
    }
    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(titleMissing)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('url missing', async () => {
    const urlMissing = {
      title: 'blog5',
      author: 'author 5',
    }
    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(urlMissing)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

describe('4.13: deleting a single blog post', () => {
  test('check for 204 and length - 1', async () => {
    const blogs = await helper.blogsInDb()
    const randomIndex = Math.floor(Math.random() * blogs.length)
    await api
      .delete(`/api/blogs/${blogs[randomIndex].id}`)
      .set('Authorization', 'Bearer ' + token)
      .expect(204)

    const afterDelete = await helper.blogsInDb()
    expect(afterDelete).toHaveLength(helper.initialBlogs.length - 1)
  })
})

describe('4.14: updating the information of an individual blog post.', () => {
  test('update likes', async () => {
    const blogs = await helper.blogsInDb()
    const randomIndex = Math.floor(Math.random() * blogs.length)
    const blogToUpdate = blogs[randomIndex]
    blogToUpdate.likes = 100

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', 'Bearer ' + token)
      .send(blogToUpdate)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(100)
  })
})


afterAll(() => {
  mongoose.connection.close()
})