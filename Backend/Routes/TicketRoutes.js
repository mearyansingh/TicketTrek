const express = require('express')
const router = express.Router()
const { getTickets, createTicket, getTicket, deleteTicket, updateTicket } = require('../Controllers/TicketController')

const { protect } = require('../Middleware/AuthMiddleware')

//Re-route into note router
const noteRouter = require('./NoteRoutes')
router.use('/:ticketId/notes', noteRouter)

//router.METHOD(PATH,Protected route, COMPONENT)
router.route('/').get(protect, getTickets).post(protect, createTicket)// another way to chain the get and post request together(GET,POST)
router.route('/:id').get(protect, getTicket).delete(protect, deleteTicket).put(protect, updateTicket)//(GET,DELETE,PUT->UPDATE)

module.exports = router