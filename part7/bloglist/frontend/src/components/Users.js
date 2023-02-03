import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  return (
    <tr>
      <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
      <td>{user.blogs.length}</td>
    </tr>
  )
}

const Users = ({ users }) => {

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => <User key={user.id} user={user} />)}
        </tbody>
      </Table>
    </div>
  )
}
export default Users