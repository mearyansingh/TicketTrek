const express = require('express')
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

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on  port ${PORT}`))