import { useQuery, useLazyQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { ALL_BOOKS, BOOKS_BY_GENRE } from "../queries"

const Books = (props) => {

  const result = useQuery(ALL_BOOKS)
  const [fetchBooksByGenre, response] = useLazyQuery(BOOKS_BY_GENRE)
  const [allBooks, setAllBooks] = useState([])
  const [books, setBooks] = useState([])
  const [genre, setGenre] = useState('all genres')

  // const books = result.data.allBooks || []
  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
      setAllBooks(result.data.allBooks)
    }
  }, [result.data])

  useEffect(() => {
    if (response.data) {
      setBooks(response.data.allBooks)
    }
  }, [response.data])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const geners = [...new Set(allBooks.flatMap(b => b.genres).concat('all genres'))]


  const handleClick = (selectedGenre) => {
    setGenre(selectedGenre)
    if (selectedGenre === 'all genres') {
      setBooks(allBooks)
      return
    }
    // setBooks(allBooks.filter(b => b.genres.includes(selectedGenre)))
    fetchBooksByGenre({ variables: { genre: selectedGenre } })
  }

  return (
    <div>
      <h2>books</h2>
      <p>in genre <strong>{genre}</strong></p>
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
      {geners.map(g => <button key={g} onClick={() => handleClick(g)}>{g}</button>)}
    </div>
  )
}

export default Books
