import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import blogService from './services/blogs'

import LoginFrom from './components/LoginForm'
import Notification from './components/Notification'
import { setUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogsReducer'

import Blog from './components/Blog'
import Blogs from './components/Blogs'
import Users from './components/Users'

import { Routes, Route, Link, useMatch } from 'react-router-dom'

import axios from 'axios'
import IndividualUser from './components/IndividualUser'


const App = () => {

  const dispatch = useDispatch()
  let user = useSelector(state => state.user)

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token)
      dispatch(initializeBlogs())
    }
  }, [dispatch])

  const [users, setUsers] = useState([])

  useEffect(() => {
    axios
      .get('api/users')
      .then(res => res.data)
      .then(allUsers => {
        allUsers.sort((a, b) => b.blogs.length - a.blogs.length)
        setUsers(allUsers)
      })
  }, [])

  const padding = { padding: 5 }

  const match = useMatch('/users/:id')
  const matchedUser = match
    ? users.find(user => user.id === match.params.id)
    : null

  const blogs = useSelector(state => state.blogs)
  const blogMatch = useMatch('/blogs/:id')
  const matchedBlog = blogMatch ? blogs.find(b => b.id === blogMatch.params.id) : null

  if (user === null) {
    return (
      <div className="container">
        <h2 className='text-center'>Login to application</h2>
        <Notification />
        <LoginFrom />
      </div>
    )
  }

  return (
    <div className="container">

      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item active'>
              <Link className='nav-link' style={padding} to='/'>Blogs</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' style={padding} to='/users'>Users</Link>
            </li>
          </ul>
          <div>
            {`${user.name} logged in`} <button className='btn btn-secondary' onClick={() => dispatch(setUser(null))}>logout</button>
          </div>
        </div>
      </nav>

      <h2>blog app</h2>
      <Routes>
        <Route path='/' element={<Blogs />} />
        <Route path='/users' element={<Users users={users} />} />
        <Route path='/users/:id' element={<IndividualUser user={matchedUser} />} />
        <Route path='/blogs/:id' element={<Blog blog={matchedBlog} />} />
      </Routes>

    </div>
  )
}

export default App
