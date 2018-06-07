const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList
} = require('graphql')

const postType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    tags: { type: GraphQLList(GraphQLString) },
    authorUsername: {
      type: GraphQLString,
      resolve: async (post, args, context) => {
        const user = await context.models.User.findById(post.authorId)
        return user.username
      }
    }
  }
})

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    post: {
      type: postType,
      args: {
        id: { type: GraphQLID }
      },
      resolve: (obj, { id }, context) => {
        const Post = context.models.Post
        return Post.findById(id)
      }
    }
  }
})

module.exports = new GraphQLSchema({ query: queryType })
