const express = require('express')
const router = express.Router()

const { registerUser, loginUser, getMe } = require('../Controllers/UserController')
const { protect } = require('../Middleware/AuthMiddleware')

//router.METHOD(PATH,Protected route, COMPONENT)
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

module.exports = router