const express = require('express')
const router = express.Router()

const { Post } = require('../models')

router.get('/', async (req, res) => {
  const tags = await Post.distinct('tags')
  res.json(tags)
})

router.get('/all', async (req, res) => {
  const posts = await Post.find()
  res.json(posts)
})

router.get('/:tag', async (req, res) => {
  const posts = await Post.find({ tags: req.params.tag })
  res.json(posts)
})



module.exports = router
