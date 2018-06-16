const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const { Post } = require('../models')

router.get('/', async (req, res) => {
  const posts = await Post.find()
  res.json(posts)
})

router.get('/:postId', async (req, res) => {
  const postId = req.params.postId
  try {
    const post = await Post.findById(postId)
    if (!post) {
      return res.sendStatus(404)
    }
    res.json(post)
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      return res.sendStatus(404)
    }
    throw err
  }
})

// POST /posts/create
router.post('/create', async (req, res) => {
  if (!req.user) {
    return res.sendStatus(401)
  }

  const { title, tags, content } = req.body
  const authorId = req.user._id

  const post = await Post.create({
    title,
    tags,
    content,
    authorId
  })

  res.json(post)
})

module.exports = router
