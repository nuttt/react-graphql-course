// index.js
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const _ = require('lodash')

const app = express()

const { Post, User } = require('./models')

const postsRoute = require('./routes/posts')
const tagsRoute = require('./routes/tags')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/posts', postsRoute)
app.use('/tags', tagsRoute)


app.post('/signup', async (req, res) => {
  const user = await User.signup(req.body.username, req.body.password)
  console.log(typeof user._id)
  res.json(_.pick(user, ['_id', 'username']))
})

app.post('/login', async (req, res) => {
  const accessToken = await User.createAccessToken(req.body.username, req.body.password)
  res.json({ accessToken })
})

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`running on port ${server.address().port}`)
})
