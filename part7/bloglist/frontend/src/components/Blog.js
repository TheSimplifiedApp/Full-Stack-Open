import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { setBlogs } from '../reducers/blogsReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  const likeBlog = async () => {
    const blogObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      comments: blog.comments
    }
    const updatedBlog = await blogService.update(blogObject, blog.id)
    dispatch(setBlogs(
      blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    ))
  }

  const leaveComment = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    if (comment === '') {
      alert('comments can\'t be empty')
      return
    }
    const blogObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      comments: blog.comments.concat([comment])
    }
    const updatedBlog = await blogService.leaveComment(blog.id, blogObject)
    dispatch(setBlogs(
      blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    ))
    event.target.comment.value = ''
  }

  if (!blog) return null
  return (
    <div>
      <h2>{blog.title}</h2>
      <a href="{blog.url}">{blog.url}</a>
      <div>{blog.likes} likes <button onClick={likeBlog} className="btn btn-primary">like</button></div>
      <div>added by {blog.author}</div>
      <h2>comments</h2>
      <ul>
        {blog.comments.map((c, i) => <li key={i}>{c}</li>)}
      </ul>

      <form onSubmit={leaveComment}>
        <textarea className="form-control" name='comment'></textarea>
        <button className="btn btn-primary my-2">comment</button>
      </form>
    </div>

  )
}

export default Blog

// import { useState } from 'react'

// const Blog = ({ blog, likeBlog, onDelete }) => {
//   const [showDetails, setShowDetails] = useState(false)

//   const toggleShowDetails = () => {
//     setShowDetails(!showDetails)
//   }

//   const details = {
//     display: showDetails ? '' : 'none',
//   }


//   const blogStyle = {
//     paddingTop: 10,
//     paddingLeft: 2,
//     border: 'solid',
//     borderWidth: 1,
//     marginBottom: 5,
//   }


//   const updateLike = () => {
//     const blogObject = {
//       user: blog.user.id,
//       likes: blog.likes + 1,
//       author: blog.author,
//       title: blog.title,
//       url: blog.url,
//     }

//     likeBlog(blog.id, blogObject)
//   }

//   const deleteBlog = () => {
//     if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
//       onDelete(blog.id)
//     }
//   }

//   return (
//     <div style={blogStyle}>
//       <span className="blog">
//         {blog.title} - {blog.author}
//       </span>{' '}
//       <button onClick={toggleShowDetails}>
//         {showDetails ? 'hide' : 'show'}
//       </button>
//       <div style={details} className="blogDetails">
//         <div>{blog.url}</div>
//         <div>
//           likes {blog.likes} <button onClick={updateLike}>like</button>
//         </div>
//         <button onClick={deleteBlog}>delete</button>
//       </div>
//     </div>
//   )
// }

// export default Blog
