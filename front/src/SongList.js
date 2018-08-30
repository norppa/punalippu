import React from 'react'
import SongLink from './SongLink'

class SongList extends React.Component {
    
    filterSongsBySearchCriteria = (song) => {
        const searchString = this.props.searchInput.toLowerCase()
        let searchTarget = song.name
        if (this.props.searchLyrics) searchTarget += song.lyrics
        searchTarget = searchTarget.toLowerCase()
        return searchTarget.includes(searchString)
      }

    render() {

        let songList = this.props.songs
        if (this.props.searchInput) {
            songList = songList.filter(this.filterSongsBySearchCriteria)
        }
        if (this.props.searchRecordedOnly) {
            songList = songList.filter(song => song.recording)
        }
        return songList
            .sort((a, b) => a.name > b.name ? 1 : -1)
            .map(song =>
                <SongLink title={song.name}
                    selectSong={this.props.selectSong}
                    selected={(song.name === this.props.selected).toString()} />
            )
    }

}

export default SongList;
