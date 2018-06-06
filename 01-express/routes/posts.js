const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/auth')

const { Post } = require('../models')

router.get('/', async (req, res) => {
  const posts = await Post.find()
  res.json(posts)
})

router.get('/:postId', async (req, res) => {
  let post
  // refactor: can use errorHandler in schema, or middleware instead
  try {
    post = await Post.findById(req.params.postId)
  } catch (err) {
    if (!err instanceof mongoose.CastError) {
      throw err
    }
  }

  if (!post) {
    return res.sendStatus(404)
  }
  res.json(post)
})

router.post('/post', authMiddleware, async (req, res) => {
  const post = await Post.create({
    title: req.body.title,
    content: req.body.content,
    tags: req.body.tags,
    authorId: req.user._id
  })
  res.json(post)
})

module.exports = router
