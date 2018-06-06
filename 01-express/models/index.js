const mongoose = require('mongoose')
mongoose.set('debug', true)

const Post = require('./Post')
const User = require('./User')

const url = 'mongodb://localhost:27017/redditclone'
mongoose.connect(url)

mongoose.connection.once('open', () => {
  console.log(`[mongoose] connected to ${url}`)
})

module.exports = {
  Post,
  User
}
