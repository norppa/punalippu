import React from 'react'
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

const apiUrl = '/api/songs'

class FakeBook extends React.Component {

  render() {
    return <div style={{color: 'black'}}>ADMIN PAGE</div>
  }
}

export default FakeBook;
