require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const app = express()

// Routes
const authRouter = require('./src/routes/auth.route')
const citizenRouter = require('./src/routes/citizen.router')
const companyRouter = require('./src/routes/company.router')

// Middleware
const { authenticateToken } = require('./src/middleware/authentication')
const { ROLE_ADMIN, ROLE_BUREAU, ROLE_CITIZEN, ROLE_COMPANY } = require('./src/constants/ROLES')


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ exposedHeaders: 'access_token' }))



// DB Config
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to database'))

// Router Config`
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/company', authenticateToken, companyRouter)
app.use('/api/v1/citizen', authenticateToken, citizenRouter)

// Start Server
app.listen(8080, () => {
  console.log("Server started on port 8080");
})



