const { makeExecutableSchema } = require('graphql-tools')
const fs = require('fs')
const path = require('path')

/* use path.join to support cross-platform */
const typeDefsPath = path.join(__dirname, 'graphql', 'typedefs.graphql')
const typeDefs = fs.readFileSync(typeDefsPath).toString()
const resolvers = require('./graphql/resolvers')

module.exports = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
})
