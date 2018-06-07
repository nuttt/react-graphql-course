const { GraphQLObjectType, GraphQLString, GraphQLSchema } = require('graphql')

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => 'hello!'
    }
  }
})

module.exports = new GraphQLSchema({ query: queryType })
