import React from 'react'
import axios from 'axios'
import FrontPage from './pages/FrontPage'
import SongInput from './pages/SongInput'
import SongOutput from './pages/SongOutput'
import SongList from './SongList'
import Search from './components/Search'
import Login from './components/Login'
import AdminPanel from './components/AdminPanel'
import titleImage from './img/kenenlippuakannat2.png'

const apiUrl = '/api/songs'

class App extends React.Component {
  state = {
    songs: [],
    selected: '',
    search: {
      searchInput: '',
      searchLyrics: false,
      searchChordedOnly: false,
      searchRecordedOnly: false
    },
    viewLogin: false,
    admin: ''
  }

  getSongs = () => {
    axios
      .get(apiUrl)
      .then(response => this.setState({ songs: response.data }))
      .catch(error => console.log('error fetching songs from db'))
  }

  saveSong = (song) => {
    axios.post(apiUrl, song, { headers: { 'authorization': 'bearer ' + this.state.admin } })
      .then(response => this.getSongs())
      .catch(error => console.log('Failed to save new song'))
  }

  login = (password) => {
    axios.post('/api/login', { password })
      .then(response => {
        this.setState({ viewLogin: false, admin: response.data.token })
      })
      .catch(error => {
        console.log("login failed", error)
        this.setState({ viewLogin: false })
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
    let selectedSong = this.state.songs.find(song => song.name === selected)
    return <SongOutput song={selectedSong} />
  }

  administer = (event) => {
    switch (event.target.name) {
      case 'add':
        this.setState({ selected: 'insertnew' })
        break
      case 'logout':
        const selected = this.state.selected === 'insertnew' ? '' : this.state.selected
        this.setState({ admin: '', selected })
        break
    }
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
              onDoubleClick={() => this.setState({ viewLogin: true })}
              alt='kenen lippua kannat' />
          </div>
        </div>
        {this.state.viewLogin && <Login submit={this.login} />}
        <div className="row">
          <div className="col content">
            <div className="content-side dark">
              <Search handleSearchChange={this.handleSearchChange}
                changeSearchInput={this.changeSearchInput}
                handleAdvancedSearchChange={this.handleAdvancedSearchChange} />

              <SongList songs={this.state.songs}
                search={this.state.search}
                selected={this.state.selected}
                selectSong={this.selectSong} />

              {this.state.admin && <AdminPanel administer={this.administer} />}
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
