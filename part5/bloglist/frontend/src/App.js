import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginFrom from './components/LoginForm'
import BlogForm from './components/BlogForm'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  // check token from local storage
  useEffect(() => {
    const loginUserJSON = window.localStorage.getItem('loginUser')
    if (loginUserJSON) {
      const loginUser = JSON.parse(loginUserJSON)
      setUser(loginUser)
      blogService.setToken(loginUser.token)
      getBlogs()
    }
  }, [])

  const notify = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const blogFormRef = useRef()

  const createBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      blogFormRef.current.toggleVisible()
      notify(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    } catch (exception) {
      console.log(exception)
      // notify('unable to create blog', 'error')
    }
  }

  const getBlogs = async () => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => b.likes - a.likes)
    setBlogs(blogs)
  }

  const likeBlog = async (id, blogObject) => {
    const updatedBlog = await blogService.update(blogObject, id)
    setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    } catch (exception) {
      console.log(exception)
    }
  }

  const login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem('loginUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      getBlogs()
    } catch (exception) {
      notify('wrong username or password', 'error')
    }
  }

  const logout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  if (user === null) {
    return (
      <>
        <h2>Login to application</h2>
        <Notification notification={notification} />
        <LoginFrom
          submit={login}
          username={username}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          password={password}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>{`${user.name} logged in`} <button onClick={logout}>logout</button></p>

      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <BlogForm create={createBlog} />
      </Togglable>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} likeBlog={likeBlog} onDelete={deleteBlog} />)}
    </div>
  )
}

export default App
