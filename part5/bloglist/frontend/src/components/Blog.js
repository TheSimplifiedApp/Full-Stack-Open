import { useState } from 'react'

const Blog = ({ blog, likeBlog, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const details = {
    display: showDetails ? '' : 'none'
  }

  const updateLike = () => {
    const blogObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    likeBlog(blog.id, blogObject)
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      onDelete(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <span className='blog'>{blog.title} - {blog.author}</span> <button onClick={toggleShowDetails}>{showDetails ? 'hide' : 'show'}</button>
      <div style={details} className='blogDetails'>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={updateLike}>like</button></div>
        <button onClick={deleteBlog}>delete</button>
      </div>
    </div>
  )
}



export default Blog