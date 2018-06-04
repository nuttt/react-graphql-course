const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  title: String,
  content: String,
  tags: [String],
  comments: [{
    content: String
  }]
}, {
  timestamps: true
})

module.exports = mongoose.model('Post', postSchema)
