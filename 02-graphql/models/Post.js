const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const postSchema = mongoose.Schema({
  title: String,
  content: String,
  tags: [String],
  authorId: ObjectId
}, {
  timestamps: true
})

postSchema.methods.getComments = function getComments() {
  return this.model('Comment').find({
    postId: this._id
  })
}

module.exports = mongoose.model('Post', postSchema)
