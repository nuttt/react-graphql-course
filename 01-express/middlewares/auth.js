const { User } = require('../models')

const authMiddleware = async (req, res, next) => {
  token = req.headers.authorization || req.query.accessToken
  if (!token) {
    return res.sendStatus(401)
  }

  try {
    const data = jwt.verify(token, 'mysecretkey')
    req.user = await User.findById(data._id)
    next()
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.sendStatus(401)
    }
    throw err
  }
}

module.exports = authMiddleware
