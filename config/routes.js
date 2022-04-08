const express = require("express");
const router = express.Router();

const usersController = require('../controllers/users.controller')
const authController = require('../controllers/auth.controller')

router.get('/', (req, res, next) => {
  console.log('hola');
  res.status(200).json({ ok: true })
})

//auth
router.post('/login', authController.login)

// User routes
router.post('/users', authController.create)
router.get('/users/me', usersController.getCurrentUser)
router.get('/users/:id', usersController.getUserById)

module.exports = router