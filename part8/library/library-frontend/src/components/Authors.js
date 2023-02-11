import { useMutation, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"

const Authors = (props) => {

  const [authors, setAuthors] = useState([])
  const response = useQuery(ALL_AUTHORS)

  // const authors = response.data.allAuthors || []
  useEffect(() => {
    if (response.data) {
      setAuthors(response.data.allAuthors)
    }  
  }, [response.data])

  const [editAuthor, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      props.setError('author not found')
    }
  }, [result.data]) // eslint-disable-line 

  if (!props.show) {
    return null
  }

  if (response.loading) {
    return <div>loading...</div>
  }

  // 8.11: Authors birth year
  const updateBirthYear = (event) => {
    event.preventDefault()
    editAuthor({ variables: { name: event.target.name.value, setBornTo: Number(event.target.born.value) } })
    event.target.name.value = ''
    event.target.born.value = ''
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={updateBirthYear}>
        <div>
          {/* name <input type="text" name='name' required /> */}
          <select name='name'>
            {authors.map(a => <option key={a.name}>{a.name}</option>)}
          </select>
        </div>
        <div>
          born <input type="number" name='born' required />
        </div>
        <button>update author</button>
      </form>
    </div>
  )
}

export default Authors
