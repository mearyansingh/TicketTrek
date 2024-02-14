const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User'//reference of user collection
	},
	ticket: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Ticket'//reference of Ticket collection
	},
	text: {
		type: String,
		required: [true, 'Please add some text'],
	},
	isStaff: {
		type: Boolean,
		default: false
	},
	staffId: {
		type: String,
	}
}, { timestamps: true })

module.exports = mongoose.model('Note', noteSchema)