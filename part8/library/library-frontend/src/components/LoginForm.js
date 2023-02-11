import { useMutation } from "@apollo/client"
import { useEffect } from "react"
import { LOGIN } from "../queries"

const LoginForm = (props) => {

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('loginUser', token)
      props.setPage('authors')
    }
  }, [result.data]) //eslint-disable-line

  if (!props.show) {
    return null
  }

  const submit = (event) => {
    event.preventDefault()
    console.log()
    login({ variables: { username: event.target.username.value, password: event.target.password.value } })
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>username <input name='username' type='text' /></div>
        <div>password <input name='password' type='password' /></div>
        <button>login</button>
      </form>
    </div>
  )
}

export default LoginForm