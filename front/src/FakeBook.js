import React from 'react'
import { Redirect } from 'react-router'
import axios from 'axios'
import FrontPage from './pages/FrontPage'
import SongInput from './pages/SongInput'
import SongOutput from './pages/SongOutput'
import SongList from './components/SongList'
import Search from './components/Search'
import Login from './components/Login'
import AdminPanel from './components/AdminPanel'
import titleImage from './img/kenenlippuakannat2.png'
import {config} from './config'
import './style.css'


import LoginModal from './components/LoginModal'
const apiUrl = '/api/songs'

class FakeBook extends React.Component {
  state = {
    songs: [],
    selected: '',
    search: {
      searchInput: '',
      searchLyrics: false,
      searchChordedOnly: false,
      searchRecordedOnly: false
    },
    clickCount: 0,
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
    const url = apiUrl + '/' + oldSong._id
    axios.put(url, newSong, { headers: { 'authorization': 'bearer ' + this.state.admin } })
      .then(() => this.getSongs())
      .catch(error => console.log('failed to update song', oldSong.name))
  }

  deleteSong = (song) => {
    if (!window.confirm(`Haluatko varmasti poistaa kappaleen "${song.name}"?`)) return
    axios.delete(apiUrl + '/' + song._id, { headers: { 'authorization': 'bearer ' + this.state.admin } })
      .then(() => this.getSongs())
      .catch(error => console.log('failed to delete song', song.name))
  }

  login = (password) => {
    axios.post('/api/login', { password })
      .then(response => {
        const token = response.data.token
        window.localStorage.setItem('admin', token)
        this.setState({ viewLogin: false, admin: token })
      })
      .catch(error => {
        console.log("login failed", error)
        this.setState({ loginError: true })
      })
  }

  componentWillMount() {
    const bodyStyles = config.style.body
    for (const styleName in bodyStyles) {
      document.body.style[styleName] = bodyStyles[styleName]
    }
    if (this.props.login) {
      this.setState({viewLogin: true})
    }
  }

  componentDidMount() {
    const token = window.localStorage.getItem('admin')
    if (token) {
      this.setState({admin: token})
    }
    this.getSongs()
  }


  selectSong = (song) => this.setState({ selected: song, edit: false })

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
      return <SongInput song={selected} handleSongInput={this.handleSongInput} />
    }

    if (selected) {
      return <SongOutput song={this.state.selected} />
    }
    return <FrontPage />
  }

  handleSongInput = (song) => {
    if (!song) {
      this.setState({ edit: false })
      return
    }
    if (this.state.selected) {
      this.updateSong(song, this.state.selected)
    } else {
      this.saveSong(song)
    }
    this.setState({ selected: song, edit: false })
  }

  administer = (action) => {
    switch (action) {
      case 'add':
        this.setState({ selected: null, edit: true })
        break
      case 'del':
        this.deleteSong(this.state.selected)
        this.setState({ selected: '', edit: false })
        break
      case 'edit':
        this.setState({ edit: true })
        break
      case 'admin':
        this.setState({ adminView: true })
        break
      case 'logout':
        const selected = this.state.selected === 'insertnew' ? '' : this.state.selected
        this.setState({ admin: '', selected, edit: false })
        window.localStorage.clear()
        break
      default:
        console.log('event not binded')
    }
  }

  handleModalClose = () => this.setState({loginCanceled: true})

  render() {
    if (this.state.loginCanceled) {
      return <Redirect to='/' />
    }

    if (this.state.adminView) {
      return <Redirect to='/admin/settings' />
    }

    const content = this.prepareContent()

    return (
      <div className="supercontainer">
      <LoginModal show={this.state.viewLogin}
        handleClickCancel={this.handleModalClose}
        handleClickLogin={this.login}
        error={this.state.loginError} />

        {this.state.admin && <AdminPanel edit={this.state.edit} administer={this.administer} />}
        <div className="row">
          <div className="col header">
            <h1 className="siteHeader">Fake Book</h1>
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

export default FakeBook;
