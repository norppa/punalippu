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
    admin: '',
    edit: false
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

  updateSong = (newSong, oldSong) => {
    axios.put(apiUrl + '/' + oldSong._id, newSong, { headers: { 'authorization': 'bearer ' + this.state.admin } })
    .then(() => this.getSongs())
    .catch(error => console.log('failed to update song', oldSong.name))
  }

  deleteSong = (song) => {
    axios.delete(apiUrl + '/' + song._id,  { headers: { 'authorization': 'bearer ' + this.state.admin } })
      .then(() => this.getSongs())
      .catch(error => console.log('failed to delete song', song.name))
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


  selectSong = (song) => this.setState({ selected: song, edit: false})

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
    const edit = this.state.edit
    if (edit) {
      console.log("edit true, selected false")
      return <SongInput song={selected} handleSongInput={this.handleSongInput} />
    }

    if (selected) {
      return <SongOutput song={this.state.selected} />
    }
    return <FrontPage />
  }

  handleSongInput = () => {
    this.setState({edit: false})
  }

  handleSongInput = (song) => {
    if (this.state.selected) {
      this.updateSong(song, this.state.selected)
    } else {
      this.saveSong(song)
    }
    this.setState({selected: song, edit: false})
  }

  administer = (event) => {
    switch (event.target.name) {
      case 'add':
        this.setState({ selected: null, edit: true })
        break
      case 'del':
        this.deleteSong(this.state.selected)
        this.setState({selected: '', edit: false})
        break
      case 'edit':
        this.setState({edit: true})
        break
      case 'cancelEdit':
        this.setState({edit: false})
        break
      case 'logout':
        const selected = this.state.selected === 'insertnew' ? '' : this.state.selected
        this.setState({ admin: '', selected, edit: false })
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
              onDoubleClick={() => this.setState({ viewLogin: !this.state.viewLogin })}
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

              {this.state.admin && <AdminPanel edit={this.state.edit} administer={this.administer} />}
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
