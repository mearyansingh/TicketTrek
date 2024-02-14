const express = require('express')
const router = express.Router({ mergeParams: true })
const { getNotes, addNote } = require('../Controllers/NoteController')

const { protect } = require('../Middleware/AuthMiddleware')

//router.METHOD(PATH,Protected route, COMPONENT)
router.route('/').get(protect, getNotes).post(protect, addNote)// another way to chain the get and post request together(GET,POST)

module.exports = router