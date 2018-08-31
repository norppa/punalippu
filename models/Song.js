const mongoose = require('mongoose')

const Song = mongoose.model('Song', {
    name: String,
    lyrics: String,
    recording: String,
    chorded: Boolean
})

module.exports = Song