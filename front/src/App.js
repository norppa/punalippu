import React from 'react'
import axios from 'axios'
import FrontPage from './pages/FrontPage'
import SongInput from './pages/SongInput'
import SongOutput from './pages/SongOutput'
import SongList from './SongList'
import Search from './components/Search'
import Login from './components/Login'
import titleImage from './img/kenenlippuakannat2.png'


const apiUrl = 'api/songs'
let songs = []

class App extends React.Component {
  state = {
    selected: '',
    search: {
      searchInput: '',
      searchLyrics: false,
      searchChordedOnly: false,
      searchRecordedOnly: false
    },
    viewLogin: false
  }

  getSongs = () => {
    axios
      .get(apiUrl)
      .then(response => {
        songs = response.data
        this.setState({ searchResults: response.data })
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

  handleSearchChange = (event) => {
    let search = this.state.search
    if (event.target.name === 'searchInput') {
      search.searchInput = event.target.value.toLowerCase()
    } else {
      const parameter = event.target.name
      search[parameter] = !search[parameter]
    }
    this.setState({ search })
  }

  prepareContent = () => {
    const selected = this.state.selected
    if (selected === 'insertnew') return <SongInput saveSong={this.saveSong} />
    if (selected === '') return <FrontPage />
    let selectedSong = songs.find(song => song.name === selected)
    return <SongOutput song={selectedSong} />
  }

  login = (password) => {
    console.log('logging in', password)
    this.setState({viewLogin: false})
  }

  render() {

    const content = this.prepareContent()

    return (
      <div className="supercontainer">
        <div className="row">
          <div className="col header">
            <img id='headerImage'
              src={titleImage}
              onClick={() => this.selectSong('')}
              onDoubleClick={() => this.setState({viewLogin: true})}
              alt='kenen lippua kannat' />
          </div>
        </div>
        {this.state.viewLogin && <Login submit={this.login}/>}
        <div className="row">
          <div className="col content">
            <div className="content-side dark">
              <Search handleSearchChange={this.handleSearchChange}
                changeSearchInput={this.changeSearchInput}
                handleAdvancedSearchChange={this.handleAdvancedSearchChange} />

              <SongList songs={songs}
                search={this.state.search}
                selected={this.state.selected}
                selectSong={this.selectSong} />
              <hr />
              {songs.length} kappaletta
                <button
                onClick={() => this.selectSong('insertnew')}>Lisää uusi</button>
            </div>
            <div className="content-main dark">
              {content}
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default App;
