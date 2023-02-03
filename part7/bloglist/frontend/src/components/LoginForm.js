import loginService from '../services/login'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { initializeBlogs } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'

const LoginFrom = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const login = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loginUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      // event.target.username.value = ''
      // event.target.password.value = ''
      dispatch(initializeBlogs())
      navigate('/')
    } catch (exception) {
      dispatch(setNotification({ message: 'wrong username or password', type: 'error' }))
      setTimeout(() => {
        dispatch(setNotification(null))
      }, 5000)
    }
  }

  return (
    <form onSubmit={login}>
      <div>
        username
        <input
          id="username"
          type="text"
          name="username"
          className='form-control'
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          name="password"
          className='form-control'
        />
      </div>
      <button id="login-button" type="submit" className='btn btn-primary form-control my-2'>
        login
      </button>
    </form>
  )
}

export default LoginFrom
