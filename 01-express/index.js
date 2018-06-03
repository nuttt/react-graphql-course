// index.js
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const { Post } = require('./models')

app.get('/posts', async (req, res) => {
  // test creating dummy posts
  // await Post.create({
  //   title: 'title',
  //   content: 'content'
  // })

  const posts = await Post.find()
  res.json(posts)
})

app.get('/posts/:postId', async (req, res) => {
  let post
  // refactor: can use errorHandler in schema instead
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

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`running on port ${server.address().port}`)
})
