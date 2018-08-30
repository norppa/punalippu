import React from 'react'
import axios from 'axios'
import FrontPage from './FrontPage'
import SongInput from './SongInput'
import SongOutput from './SongOutput'
import SongList from './SongList'
import Search from './Search'
import SearchOptions from './SearchOptions'
import titleImage from './img/kenenlippuakannat2.png'

// all this hassle for one icon???
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleDoubleDown, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(faAngleDoubleDown, faAngleDoubleUp)



const apiUrl = 'api/songs'

class App extends React.Component {
  state = {
    songs: [],
    selected: '',
    searchAdvanced: false,
    searchLyrics: false,
    searchRecordedOnly: false,
    searchInput: ''
  }

  getSongs = () => {
    axios
      .get(apiUrl)
      .then(response => {
        console.log("songs fetched", response.data)
        this.setState({ songs: response.data })
      })
      .catch(error => console.log('error fetching songs from db'))
  }

  saveSong = (song) => {
    axios.post(apiUrl, song)
      .then(response => {
        console.log('saveSong success')
        this.getSongs()
      })
      .catch(error => {
        console.log('saveSong fail')
      })

  }

  componentDidMount() {
    this.getSongs()
  }

  selectSong = (song) => this.setState({ selected: song })

  changeSearchInput = (event) => this.setState({ searchInput: event.target.value })
  changeSearchSelect = (event) => this.setState({ searchSelect: event.target.value })
  toggleAdvancedSearch = () => this.setState(prevState => ({ searchAdvanced: !prevState.searchAdvanced }))
  toggleSearchLyrics = () => this.setState(prevState => ({ searchLyrics: !prevState.searchLyrics }))
  toggleSearchRecordedOnly = () => this.setState(prevState => ({ searchRecordedOnly: !prevState.searchRecordedOnly }))

  prepareContent = () => {
    const selected = this.state.selected
    if (selected === 'insertnew') return <SongInput saveSong={this.saveSong} />
    if (selected === '') return <FrontPage />
    let selectedSong = this.state.songs.find(song => song.name === selected)
    return <SongOutput song={selectedSong} />
  }

  render() {

    const content = this.prepareContent()

    let toggleAdvancedSearchIcon, advancedSearchComponent
    if (this.state.searchAdvanced) {
      toggleAdvancedSearchIcon = <FontAwesomeIcon
        icon='angle-double-up' size='2x' onClick={this.toggleAdvancedSearch} />
      advancedSearchComponent = <SearchOptions
        toggleSearchLyrics={this.toggleSearchLyrics}
        toggleSearchRecordedOnly={this.toggleSearchRecordedOnly} />
    } else {
      toggleAdvancedSearchIcon =
        <FontAwesomeIcon icon='angle-double-down' size='2x' onClick={this.toggleAdvancedSearch} />
    }

    return (
        <div className="supercontainer">
          <div className="arow">
            <div className="acol header">
              <img onClick={() => this.selectSong('')} src={titleImage} />
            </div>
          </div>
          <div className="arow">
            <div className="acol content">
              <div className="content-side dark">
                <Search changeSearchInput={this.changeSearchInput} />
                <input type='text'
                  value={this.state.searchInput}
                  onChange={this.changeSearchInput}></input>
                &emsp;
                  {toggleAdvancedSearchIcon}

                  <br />
              {advancedSearchComponent}
              <SongList songs={this.state.songs}
                selected={this.state.selected}
                searchInput={this.state.searchInput}
                searchLyrics={this.state.searchLyrics}
                selectSong={this.selectSong} />
              <hr />
              {this.state.songs.length} kappaletta
                <button
                onClick={() => this.selectSong('insertnew')}>Lisää uusi</button>
            </div>
            <div className="content-main dark">
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
