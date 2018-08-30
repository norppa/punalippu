import React from 'react'

class App extends React.Component {
    state = { name: '', recording: '', chords: false, lyrics: '' }

    handleChangeName = (event) => this.setState({ name: event.target.value })
    handleChangeRecording = (event) => this.setState({ recording: event.target.value })
    handleChamgeLyrics = (event) => this.setState({ lyrics: event.target.value })
    handleChangeChords = () => this.setState(prevState => ({chords: !prevState.chords}))

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.saveSong(this.state)
        this.setState({name: '', recording: '', chords: false, lyrics: ''})
    }

    render() {
        return (
            <form>
                Nimi:<input type="text"
                    value={this.state.name}
                    onChange={this.handleChangeName} /><br />
                Tallenne: <input type="text"
                    value={this.state.recording}
                    onChange={this.handleChangeRecording} /><br />
                Soinnutettu: <input type="checkbox"
                    onChange={this.handleChangeChords} /><br />
                <textarea rows="30" cols="50"
                    value={this.state.lyrics}
                    onChange={this.handleChamgeLyrics} /><br />
                <button type='submit'
                    onClick={this.handleSubmit}>tallenna</button>
            </form>
        )
    }
}

export default App;
