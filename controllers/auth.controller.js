const User = require('../models/User.model')
const createError = require('http-errors')
const jwt = require('jsonwebtoken')

module.exports.create = (req, res, next) => {
    User.create(req.body)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(next)
}

module.exports.login = (req, res, next) => {
    const { email, password } = req.body

    const throwException = () => next(createError(401, 'Incorrect credentials')) 

    if ( !email || !password){
        return throwException()
    }

    User.findOne({ email })
    .then((user) => {
      if (!user) {
        throwException()
      } else {
        return user.checkPassword(password)
          .then(match => {
            if (!match) {
              throwException()
            } else {
              res.json({
                access_token: jwt.sign(
                  {
                    id: user.id
                  },
                  process.env.JWT_SECRET || 'changeme',
                  {
                    expiresIn: '1s'
                  }
                )
              })
            }
          })
      }
    })
    .catch(next)
}