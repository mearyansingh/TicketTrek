const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Note = require('../Models/NoteModel')
const Ticket = require('../Models/TicketModel')

// @desc Get note for a ticket
// @route GET /api/tickets/:ticketId/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {

   //Get user using the id in the JWT
   const user = await User.findById(req.user.id)

   if (!user) {
      res.status(401)
      throw new Error('User not Found')
   }

   const ticket = await Ticket.findById(req.params.ticketId)//Single ticket

   if (ticket.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('User not authorized')
   }

   const notes = await Note.find({ ticket: req.params.ticketId })

   res.status(200).json(notes)
})

// @desc create ticket note
// @route POST /api/tickets/:ticketId/notes
// @access Private
const addNote = asyncHandler(async (req, res) => {

   //Get user using the id in the JWT
   const user = await User.findById(req.user.id)

   if (!user) {
      res.status(401)
      throw new Error('User not Found')
   }

   const ticket = await Ticket.findById(req.params.ticketId)//Single ticket

   if (ticket.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('User not authorized')
   }

   const note = await Note.create({ user: req.user.id, ticket: req.params.ticketId, text: req.body.text, isStaff: false })

   res.status(200).json(note)
})

module.exports = { getNotes, addNote }