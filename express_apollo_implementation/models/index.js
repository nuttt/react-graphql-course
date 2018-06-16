// models/index.js
const mongoose = require('mongoose')

const Post = require('./Post')
const User = require('./User')

mongoose.set('debug', true)
mongoose.connect('mongodb://localhost:27017/redditclone')

const db = mongoose.connection

db.once('open', function() {
  console.log('connected to db')
  // we're connected!
});

module.exports = {
  Post,
  User
}
