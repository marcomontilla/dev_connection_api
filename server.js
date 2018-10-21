const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const keys = require('./config/keys')
const passport = require('passport')

const users = require('./routes/api/users')
const profiles = require('./routes/api/profiles')
const posts = require('./routes/api/posts')

const app = express()
const port = process.env.PORT || 5000

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())

// DB Config
const db = keys.mongoURI

// Connect to MongoDB
mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected'))
	.catch((err) => console.log(err))

// Passport Middleware
app.use(passport.initialize())

// Passport Config
require('./config/passport')(passport)

// Use Routes
app.use('/api/users', users )
app.use('/api/profiles', profiles )
app.use('/api/posts', posts )

app.listen(port, () => console.log(`Listening... port ${port}`))