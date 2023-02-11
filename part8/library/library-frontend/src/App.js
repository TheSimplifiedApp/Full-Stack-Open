import { useApolloClient } from '@apollo/client'
import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import Recommend from './components/Recommend'

import { useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries'


// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (all) => {
    let seen = new Set()
    return all.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log(data)
      const addedBook = data.data.bookAdded
      // notify(`${addedBook.title} added`)
      window.alert(`${addedBook.title} added`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
      // client.cache.updateQuery({ query: ALL_BOOKS }, ({allBooks}) => {
      //   return {
      //     allBooks: allBooks.concat(addedBook)
      //   }
      // })
    }
  })

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000);
  }

  const logout = () => {
    setToken(null)
    client.clearStore()
    localStorage.clear()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommend')}>recommend</button>}
        {token && <button onClick={logout}>logout</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Notification message={errorMessage} />
      <LoginForm show={page === 'login'} setError={notify} setToken={setToken} setPage={setPage} />
      <Authors show={page === 'authors'} setError={notify} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} setError={notify} />
      <Recommend show={page === 'recommend'} />
    </div>
  )
}

export default App
