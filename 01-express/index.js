// index.js
const express = require('express')
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

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`running on port ${server.address().port}`)
})
