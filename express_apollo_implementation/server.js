const express = require('express')
const app = express()
const morgan = require('morgan')

const bodyParser = require('body-parser')

const postRoute = require('./routes/postRoute')
const tagRoute = require('./routes/tagRoute')

const graphqlHTTP = require('express-graphql')

const DataLoader = require('dataloader')

const { User } = require('./models')
const models = require('./models')
const { authMiddleware } = require('./libs/auth')

const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const schema = require('./schema')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(authMiddleware)

app.use(morgan('dev'))

const {
  createUserLoader,
  createPostsByUserIdLoader
} = require('./loaders')

app.use('/graphql', graphqlExpress((req, res) => {
  return {
    schema: schema,
    context: {
      loaders: {
        userLoader: createUserLoader(),
        postsByUserIdLoader: createPostsByUserIdLoader()
      },
      models,
      user: req.user,
    }
  }
}))

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))

// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   graphiql: true
// }))

app.use('/posts', postRoute)
app.use('/tags', tagRoute)

app.post('/signup', async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.sendStatus(400)
  }

  try {
    const user = await User.signup(username, password)
    res.json({
      _id: user._id,
      username: user.username
    })
  } catch (e) {
    if (e.name === 'DuplicateUser') {
      return res.status(400).send(e.message)
    }
    throw e
  }
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  const token = await User.createAccessToken(username, password)

  if (!token) {
    return res.sendStatus(401) // Unauthorized
  }

  return res.json({ token })
})

app.get('/me', (req, res) => {
  if (!req.user) {
    return res.sendStatus(401) // Unauthorized
  }

  res.json(req.user)
})


app.listen(3000, () => {
  console.log('listen on port 3000')
})
