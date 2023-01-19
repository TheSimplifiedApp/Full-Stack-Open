const LoginFrom = ({ submit, username, handleUsernameChange, password, handlePasswordChange }) => (
  <form onSubmit={submit}>
    <div>
      username
      <input id='username' type='text' value={username} onChange={handleUsernameChange} />
    </div>
    <div>
      password
      <input id='password' type='password' value={password} onChange={handlePasswordChange} />
    </div>
    <button id='login-button' type='submit'>login</button>
  </form>
)

export default LoginFrom