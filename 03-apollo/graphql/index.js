// graphql/index.js

const fs = require('fs')
const path = require('path')
const { makeExecutableSchema } = require('graphql-tools')


const typeDefs = fs.readFileSync(path.join(__dirname, 'typedefs.gql')).toString()
const resolvers = require('./resolvers')

module.exports = makeExecutableSchema({ typeDefs, resolvers })
