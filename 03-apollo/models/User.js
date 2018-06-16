const mongoose = require('mongoose')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const hashPassword = (password) => {
  return crypto
    .createHmac('sha256', 'mysecretkey')
    .update(password)
    .digest('hex')
}

const userSchema = mongoose.Schema({
  username: { type: String, require: true, index: { unique: true } },
  password: { type: String, require: true }
})

userSchema.statics.signup = async function(username, password) {
  return this.create({
    username,
    password: hashPassword(password)
  })
}

userSchema.statics.createAccessToken = async function(username, password) {
  const user = await this.findOne({ username })
  if (!user) {
    return undefiend
  }
  if (hashPassword(password) !== user.password) {
    return undefined
  }
  return jwt.sign({ _id: user._id }, 'mysecretkey')
}

module.exports = mongoose.model('User', userSchema)
