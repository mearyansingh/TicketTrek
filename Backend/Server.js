const express = require('express')
const path = require('path')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./Middleware/ErrorMiddleware.js')
const connectDB = require('./Config/Db')

const PORT = process.env.PORT || 5000

//Connect to database
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
	res.json({ message: 'Welcome to the support desk api' })
})

//Routes
app.use('/api/users', require('./Routes/UserRoutes.js'))
app.use('/api/tickets', require('./Routes/TicketRoutes.js'))

//Serve Frontend
if (process.env.NODE_ENV === "production") {
	//set build folder as static
	app.use(express.static(path.join(__dirname, '/frontend/build')))

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, '/frontend', 'build', 'index.html'), function (err) {
			if (err) {
				res.status(500).send(err)
			}
		})
	})
} else {
	app.get('/', (req, res) => {
		res.json({ message: 'Welcome to the TicketTrek api' })
	})
}

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on  port ${PORT}`))