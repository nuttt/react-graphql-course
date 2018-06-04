const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.ObjectId

const postSchema = mongoose.Schema({
  title: String,
  content: String,
  tags: [{ type: String }],
  authorId: ObjectId
}, {
  timestamps: true
})

module.exports = mongoose.model('Post', postSchema)
