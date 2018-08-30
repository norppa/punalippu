import React from 'react'
import SongLink from './SongLink'

const SongList = ({songs, search, selected, selectSong}) => {
    return songs
        .filter(song => {
            if (search.searchChordedOnly && song.chorded === false) return false
            if (search.searchRecordedOnly && song.recording === '') return false

            let searchTarget = song.name
            if (search.searchLyrics) searchTarget += song.lyrics
            searchTarget = searchTarget.toLowerCase()
            return searchTarget.includes(search.searchInput)
        })
        .sort((a, b) => a.name > b.name ? 1 : -1)
        .map(song =>
            <SongLink title={song.name}
                selectSong={selectSong}
                selected={(song.name === selected).toString()} />
        )
}

export default SongList;
