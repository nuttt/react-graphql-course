const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const commentSchema = mongoose.Schema({
  content: String,
  postId: ObjectId,
  authorId: ObjectId,
}, {
  timestamps: true
})

module.exports = mongoose.model('Comment', commentSchema)
