// graphql/resolvers.js

module.exports = {
  Query: {
    posts: (obj, args, { models: { Post } }) => {
      return Post.find()
    },
    post: (obj, { id }, context) => {
      const Post = context.models.Post
      return Post.findById(id)
    },
    tags: (obj, args, { models: { Post }}) => {
      return Post.distinct('tags')
    },
    tag: (obj, { name }) => name,
    user: (obj, { id, username }, { models: { User }}) => {
      if (username) {
        return User.findOne({ username })
      } else if (id) {
        return User.findById(id)
      } else {
        throw new Error('must provide username or id')
      }
    }
  },
  Post: {
    author: (post, args, { models: { User } }) => {
      return User.findById(post.authorId)
    },
    comments: (post, args, { models: { Comment }}) => {
      return Comment.find({ postId: post._id })
    }
  },
  Comment: {
    author: (post, args, { models: { User } }) => {
      return User.findById(post.authorId)
    }
  },
  User: {
    posts: (user, args, { models: { Post } }) => {
      return Post.find({ authorId: user._id })
    }
  },
  Tag: {
    name: (tagString) => tagString,
    posts: (tagString, args, { models: { Post } }) => {
      return Post.find({ tags: req.params.tag })
    }
  }
}
