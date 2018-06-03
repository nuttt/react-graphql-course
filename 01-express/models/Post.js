const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.ObjectId

const postSchema = mongoose.Schema({
  title: String,
  content: String,
  tagIds: [{ type: ObjectId }],
  authorId: ObjectId
}, {
  timestamps: true
})

module.exports = mongoose.model('Post', postSchema)
