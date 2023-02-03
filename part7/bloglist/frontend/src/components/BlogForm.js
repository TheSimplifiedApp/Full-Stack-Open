import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { appendBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = ({ toggleRef }) => {

  const dispatch = useDispatch()

  const notify = (message, type = 'info') => {
    dispatch(setNotification({ message, type }))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000)
  }

  const createBlog = async (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    try {
      const newBlog = await blogService.create({ title, author, url })
      dispatch(appendBlog(newBlog))
      toggleRef.current.toggleVisible()
      notify(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      event.target.title.value = ''
      event.target.author.value = ''
      event.target.url.value = ''
    } catch (exception) {
      console.log(exception)
      // notify('unable to create blog', 'error')
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>
          title:
          <input
            type="text"
            name='title'
            id="title"
            className='form-control'
          ></input>
        </div>
        <div>
          author:
          <input
            type="text"
            name='author'
            id="author"
            className='form-control'
          ></input>
        </div>
        <div>
          url:
          <input
            type="text"
            name='url'
            id="url"
            className='form-control'
          ></input>
        </div>
        <button type="submit" id="submit-button" className='btn btn-primary my-2'>
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
