const songsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Song = require('../models/song')



songsRouter.get('/', (request, response) => {
    Song.find({}).then(songs => response.json(songs))
})

const authError = (request) => {
    const authorization = request.get('authorization')
    if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
        return { error: 'bearer token required' }
    }

    try {
        jwt.verify(authorization.substring(7), process.env.SECRET)
    } catch (error) {
        return { error: error.toString() }
    }

    return null
}

songsRouter.post('/', (request, response) => {
    const error = authError(request)
    if (error) return response.status(401).send(error)

    const input = request.body
    const song = new Song({
        name: input.name,
        lyrics: input.lyrics,
        recording: input.recording
    })
    song.save().then(result => response.json(song))


})

songsRouter.delete('/:id', (request, response) => {
    const error = authError(request)
    if (error) return response.status(401).send(error)

    Song.remove({_id: request.params.id})
    .then(result => response.status(204).send())
})

module.exports = songsRouter