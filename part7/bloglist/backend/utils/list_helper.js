const groupBy = require('lodash/groupBy')

const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  if (blogs === []) return 0
  const likes = blogs.map(blog => blog.likes)
  const reducer = (sum, item) => {
    return sum + item
  }
  return likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const favoriteIndex = likes.indexOf(Math.max(...likes))
  return {
    title: blogs[favoriteIndex].title,
    author: blogs[favoriteIndex].author,
    likes: blogs[favoriteIndex].likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}

  const summary = blogs.reduce((acc, cur) => {
    if (acc[cur.author]) acc[cur.author] += 1
    else acc[cur.author] = 1
    return acc
  }, {})

  const maxBlogCount = Math.max(...Object.values(summary))
  const maxBlogAuthor = Object.keys(summary).filter(author => summary[author] === maxBlogCount)
  return {author: maxBlogAuthor[0], blogs: maxBlogCount}
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {} 

  const summary = blogs.reduce((acc, cur) => {
    acc[cur.author] = (acc[cur.author] || 0) + cur.likes
    return acc
  }, {})

  const maxLikesCount = Math.max(...Object.values(summary))
  const maxLikesAuthor = Object.keys(summary).filter(author => summary[author] === maxLikesCount)
  return { author: maxLikesAuthor[0], likes: maxLikesCount}
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }