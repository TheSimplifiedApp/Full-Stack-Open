import { useState } from 'react'

const BlogForm = ({ create }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = (event) => {
    event.preventDefault()
    create({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>
          title:
          <input type='text' value={title} onChange={({ target }) => setTitle(target.value)} id='title'></input>
        </div>
        <div>
          author:
          <input type='text' value={author} onChange={({ target }) => setAuthor(target.value)} id='author'></input>
        </div>
        <div>
          url:
          <input type='text' value={url} onChange={({ target }) => setUrl(target.value)} id='url'></input>
        </div>
        <button type='submit' id='submit-button'>create</button>
      </form>
    </div>
  )
}

export default BlogForm