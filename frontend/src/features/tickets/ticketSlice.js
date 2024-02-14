import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketService from './ticketService'

const initialState = {
	tickets: [],
	ticket: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
}

// Create new ticket
export const createTicket = createAsyncThunk(
	'tickets/create', //action type
	async (ticketData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token//we can get token from auth slice using thunkAPI
			return await ticketService.createTicket(ticketData, token)
		} catch (error) {
			const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	},//callback function(payload)
)

//Get user tickets 
export const getTickets = createAsyncThunk(
	'tickets/getAll', //action type
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token//we can get token from auth slice using thunkAPI
			return await ticketService.getTickets(token)
		} catch (error) {
			const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	},//callback function(payload)
)

//Get user ticket (single ticket)
export const getTicket = createAsyncThunk(
	'tickets/get', //action type
	async (ticketId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token//we can get token from auth slice using thunkAPI
			return await ticketService.getTicket(ticketId, token)
		} catch (error) {
			const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	},//callback function(payload)
)

//Close ticket (single ticket)
export const closeTicket = createAsyncThunk(
	'tickets/close', //action type
	async (ticketId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token//we can get token from auth slice using thunkAPI
			return await ticketService.closeTicket(ticketId, token)
		} catch (error) {
			const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	},//callback function(payload)
)

export const ticketSlice = createSlice({
	name: 'ticket',
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(createTicket.pending, (state) => {
				state.isLoading = true
			})
			.addCase(createTicket.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				// state.user = action.payload
			})
			.addCase(createTicket.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				// state.user = null
			})
			.addCase(getTickets.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getTickets.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.tickets = action.payload
			})
			.addCase(getTickets.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(getTicket.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getTicket.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.ticket = action.payload
			})
			.addCase(getTicket.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(closeTicket.fulfilled, (state, action) => {
				state.isLoading = false
				state.tickets.map((ticket) => ticket._id === action.payload._id ? (ticket.status = 'closed') : ticket)
			})
	}
})

export const { reset } = ticketSlice.actions
export default ticketSlice.reducer