import { useRef } from 'react'
import { useSelector } from 'react-redux'
// import Blog from './Blog'
// import blogService from '../services/blogs'
// import { setBlogs } from '../reducers/blogsReducer'

import BlogForm from './BlogForm'
import Togglable from './Togglable'
import Notification from './Notification'
import { Link } from 'react-router-dom'

const Blogs = () => {
  // const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const blogFormRef = useRef()

  // const likeBlog = async (id, blogObject) => {
  //   const updatedBlog = await blogService.update(blogObject, id)
  //   dispatch(setBlogs(
  //     blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
  //   ))
  // }

  // const deleteBlog = async (id) => {
  //   try {
  //     await blogService.deleteBlog(id)
  //     dispatch(setBlogs(blogs.filter((blog) => blog.id !== id)))
  //   } catch (exception) {
  //     console.log(exception)
  //   }
  // }

  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5,
  // }

  return (
    <div>
      <Notification />
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <BlogForm toggleRef={blogFormRef} />
      </Togglable>
      <ul className='list-group'>
        {blogs.map(blog => (
          <div key={blog.id} className='list-group-item'>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
      </ul>

    </div>
  )
}

export default Blogs