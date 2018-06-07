// graphql/resolvers.js

module.exports = {
  Query: {
    post: (obj, { id }, context) => {
      const Post = context.models.Post
      return Post.findById(id)
    }
  },
  Post: {
   author: (post, args, context) => {}
  },
  Tag: {
    name: (tagString) => {}
  }
}
