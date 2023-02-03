const commentsRouter = require('express').Router()
const Comment = require('../models/comment')

commentsRouter.get('/', async (request, response) => {
  const comments = await Comment.find({}).populate('blog', {title: 1, author: 1})
  response.json(comments)
})

commentsRouter.post('/:id')

module.exports = commentsRouter