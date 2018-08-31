import React from 'react'

class App extends React.Component {
    state = { name: '', recording: '', chorded: false, lyrics: '' }

    componentDidMount() {
        if (this.props.song) {
            this.setState(this.props.song)
        }
    }

    handleChangeName = (event) => this.setState({ name: event.target.value })
    handleChangeRecording = (event) => this.setState({ recording: event.target.value })
    handleChamgeLyrics = (event) => this.setState({ lyrics: event.target.value })
    handleChangeChords = () => this.setState(prevState => ({ chorded: !prevState.chorded }))

    handleSubmit = () => {
        this.props.handleSongInput(this.state)
    }

    handleCancel = () => {
        this.props.handleSongInput()
    }

    render() {
        return (
            <div className="songInput">
                Nimi:<input type="text"
                    value={this.state.name}
                    onChange={this.handleChangeName} /><br />
                Tallenne: <input type="text"
                    value={this.state.recording}
                    onChange={this.handleChangeRecording} /><br />
                Soinnutettu: <input type="checkbox"
                    onChange={this.handleChangeChords} /><br />
                <textarea
                    value={this.state.lyrics}
                    onChange={this.handleChamgeLyrics} /><br />
                <button onClick={this.handleSubmit}>tallenna</button>
                <button onClick={this.handleCancel}>peruuta</button>
            </div>
        )
    }
}

export default App;
