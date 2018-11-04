import React from 'react'

class SongList extends React.Component {

    foo = (song) => () => this.props.selectSong(song)

    render() {
        return this.props.songs
            .filter(song => {
                if (this.props.search.searchChordedOnly && song.chorded === false) return false
                if (this.props.search.searchRecordedOnly && song.recording === '') return false

                let searchTarget = song.name
                if (this.props.search.searchLyrics) searchTarget += song.lyrics
                searchTarget = searchTarget.toLowerCase()
                return searchTarget.includes(this.props.search.searchInput)
            })
            .sort((a, b) => a.name > b.name ? 1 : -1)
            .map(song => {
                const classes = "songlink" + (this.props.selected === song ? " selectedsong" : "")
                return (
                    <div key={song._id}
                        className={classes}
                        onClick={this.foo(song)}>
                        {song.name}
                    </div>
                )
            })
    }
}


export default SongList;
