const IndividualUser = ({ user }) => {
  // console.log(user)
  if (!user) return null
  return (
    <div>
      <h2>{user.name}</h2>
      <p>added blogs</p>
      <ul className="list-group">
        {user.blogs.map(b => <li key={b.id} className='list-group-item'>{b.title}</li>)}
      </ul>
    </div>
  )
}

export default IndividualUser