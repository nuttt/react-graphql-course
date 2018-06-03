// index.js
const express = require('express')

const app = express()

app.get('/hello', (req, res) => {
  res.send('Hello World!')
})

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`running on port ${server.address().port}`)
})
