// index.js
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const _ = require('lodash')

const app = express()

const { Post, User } = require('./models')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/posts', async (req, res) => {
  const posts = await Post.find()
  res.json(posts)
})

app.get('/posts/:postId', async (req, res) => {
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

app.get('/tags', async (req, res) => {
  const tags = await Post.distinct('tags')
  res.json(tags)
})

app.get('/tags/:tag', async (req, res) => {
  const posts = await Post.find({ tags: req.params.tag })
  res.json(posts)
})

app.get('/tags/all', async (req, res) => {
  const posts = await Post.find()
  res.json(posts)
})

app.post('/signup', async (req, res) => {
  const user = await User.signup(req.body.username, req.body.password)
  console.log(typeof user._id)
  res.json(_.pick(user, ['_id', 'username']))
})

app.post('/login', async (req, res) => {
  const accessToken = await User.createAccessToken(req.body.username, req.body.password)
  res.json({ accessToken })
})

const authMiddleware = async (req, res, next) => {
  token = req.headers.authorization || req.query.accessToken
  if (!token) {
    return res.sendStatus(401)
  }

  try {
    const data = jwt.verify(token, 'mysecretkey')
    req.user = await User.findById(data._id)
    next()
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.sendStatus(401)
    }
    throw err
  }
}

app.post('/post', authMiddleware, async (req, res) => {
  const post = await Post.create({
    title: req.body.title,
    content: req.body.content,
    tags: req.body.tags,
    authorId: req.user._id
  })
  res.json(post)
})

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`running on port ${server.address().port}`)
})
