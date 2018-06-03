const mongoose = require('mongoose')

const Post = require('./Post')

const url = 'mongodb://localhost:27017/redditclone'
mongoose.connect(url)

mongoose.connection.once('open', () => {
  console.log(`[mongoose] connected to ${url}`)
})

module.exports = {
  Post
}
