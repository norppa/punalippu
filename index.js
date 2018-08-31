require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const songsRouter = require('./controllers/songsController')
const loginRouter = require('./controllers/loginController')

const mongoose = require('mongoose')
const url = process.env.MONGODB_URL
mongoose.connect(url, { useNewUrlParser: true })
.catch(error => console.log(error))

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))
app.use('/api/songs', songsRouter)
app.use('/api/login', loginRouter)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})