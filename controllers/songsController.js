const songsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Song = require('../models/song')

songsRouter.get('/', (request, response) => {
    Song.find({}).then(songs => response.json(songs))
})

const extractToken = (request) => {
    const authorization = request.get('authorization')
    if (auhtorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    } else {
        return null
    }
}

songsRouter.post('/', (request, response) => {

    const authorization = request.get('authorization')
    if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
        return response.status(401).send({ error: 'bearer token required' })
    }

    try {
        jwt.verify(authorization.substring(7), process.env.SECRET)
    } catch (error) {
        return response.status(401).send({ error: error.toString() })
    }

    const input = request.body
    const song = new Song({
        name: input.name,
        lyrics: input.lyrics,
        recording: input.recording
    })
    song.save().then(result => response.json(song))


})

songsRouter.get('/:id', (request, response) => {
    const id = Number(request.params.id)
    const song = songs.find(song => song.id === id)
    if (song) {
        response.json(song)
    } else {
        response.status(404).end()
    }
})

module.exports = songsRouter