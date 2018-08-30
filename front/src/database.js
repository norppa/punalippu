import axios from 'axios'

const apiUrl = 'http://localhost:3001/songs'

export const getSongs = () => {
    console.log("getsongs called")
    axios
        .get(apiUrl)
        .then(response => {
            console.log("songs fetched", response.data)
            this.setState({ songs: response.data })
        })
        .catch(error => console.log('error fetching songs from db'))
    console.log("done")
}


const saveSong = (song) => {
    axios.post(apiUrl, song)
        .then(response => {
            console.log('saveSong success')
            this.getSongs()
        })
        .catch(error => {
            console.log('saveSong fail')
        })

}

export { saveSong }