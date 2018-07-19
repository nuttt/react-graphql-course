const { User, Post } = require('../models')
const DataLoader = require('dataloader')

const { PubSub, withFilter } = require('graphql-subscriptions')
const pubsub = new PubSub()

module.exports = {
  Tag: {
    posts: async (tag) => {
      const posts = await Post.find({ tags: tag.name })
      return posts
    }
  },
  Post: {
    id: (post) => {
      return post._id
    },
    author: async (post, args, context) => {
      // const user = await User.findById(post.authorId)
      const user = await context.loaders.userLoader.load(post.authorId)
      return user
    },
    tags: (post) => {
      return post.tags.map((tag) => {
        return { name: tag }
      })
    },
    titleLength: (post) => {
      return post.title.length
    }
  },
  User: {
    id: (user) => {
      return user._id
    },
    posts: async (user, args, context) => {
      // const post = await Post.find({ authorId: user._id })
      const posts = await context.loaders.postsByUserIdLoader.load(user._id)
      return posts
    }
  },
  Query: {
    posts: async (obj, { tag, tags }, context) => {
      if (tags) {
        const posts = await context.models.Post.find({ tags: { $in: tags } })
        return posts
      }
      if (tag) {
        const posts = await context.models.Post.find({ tags: tag })
        return posts
      }
      const posts = await context.models.Post.find()
      return posts
    },
    post: async (obj, { id }) => {
      const post = await Post.findById(id)
      return post
    },
    users: async () => {
      const users = await User.find()
      return users
    },
    me: async (obj, args, context) => {
      return context.user
    },
    hello: () => {
      pubsub.publish('HELLO_QUERIED')
      return 'Hello World!'
    }
  },
  Mutation: {
    login: async (obj, { username, password }) => {
      const token = await User.createAccessToken(username, password)
      return token
    },
    signup: async (obj, { username, password }) => {
      const user = await User.signup(username, password)
      return user
    },
    createPost: async (obj, { data }, context) => {
      if (!context.user) {
        throw new Error('Unauthorized')
      }

      const post = await Post.create({
        ...data,
        authorId: context.user.id
      })

      pubsub.publish('POST_CREATED', { id: post.id, tags: post.tags })
      return post
    }
  },
  Subscription: {
    helloQueried: {
      resolve: () => {
        return `${new Date()}`
      },
      subscribe: () => {
        return pubsub.asyncIterator('HELLO_QUERIED')
      }
    },
    postCreated: {
      resolve: async (payload) => {
        const post = await Post.findById(payload.id)
        return post
      },
      subscribe: withFilter(() => {
        return pubsub.asyncIterator('POST_CREATED')
      }, (payload, { tag }) => {
        return payload.tags.includes(tag)
      })
    }
  }
}
