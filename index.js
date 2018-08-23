const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))

const mongoose = require('mongoose')
const url = 'mongodb://kaartilainen:kaartilaisensalasana7@ds125482.mlab.com:25482/warshawjanka'
mongoose.connect(url, { useNewUrlParser: true })

const Song = mongoose.model('Song', {
    name: String,
    lyrics: String,
    recording: String
})

app.get('/', (req, res) => {
    res.send('<h1>Purppuravaate</h1>')
})

app.get('/songs', (req, res) => {
    Song.find({}).then(songs => res.json(songs))
})

app.post('/songs', (req, res) => {

    const input = req.body
    const song = new Song({
        name: input.name,
        lyrics: input.lyrics,
        recording: input.recording
    })
    song.save()
        .then(result => {
            console.log('new song saved')
            res.json(song)
        })
})

app.get('/songs/:id', (req, res) => {
    const id = Number(req.params.id)
    const song = songs.find(song => song.id === id)
    if (song) {
        res.json(song)
    } else {
        res.status(404).end()
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})