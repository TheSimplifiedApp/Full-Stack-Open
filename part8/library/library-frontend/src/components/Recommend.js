import { useLazyQuery, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { BOOKS_BY_GENRE, ME } from "../queries"

const Recommend = (props) => {

  const user = useQuery(ME)
  const [fetchBooksByGenre, result] = useLazyQuery(BOOKS_BY_GENRE)
  const [genre, setGenre] = useState('')
  const [books, setBooks] = useState([])

  useEffect(() => {
    // console.log(user.data)
    if (user.data !== undefined && user.data.me) {
      setGenre(user.data.me.favouriteGenre)
      fetchBooksByGenre({ variables: { genre: user.data.me.favouriteGenre } })
    }
  }, [user.data, fetchBooksByGenre])

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{genre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend