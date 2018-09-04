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
        const rows = this.state.lyrics.split('\n').length
        return (
            <div className="songInput">
                <h2>Muokataan: {this.state.name}</h2>

                <div className='inputTable'>
                    <div className='inputTableCol'>
                        <div className='inputTableRow'>Nimi:</div>
                        <div className='inputTableRow'>Tallenne:</div>
                        <div className='inputTableRow'>Soinnutettu:</div>

                    </div>
                    <div className='inputTableCol inputTableColRight'>
                        <div className='inputTableRow'>
                            <input type="text"
                                value={this.state.name}
                                onChange={this.handleChangeName} />
                        </div>
                        <div className='inputTableRow'>
                            <input type="text"
                                value={this.state.recording}
                                onChange={this.handleChangeRecording} />
                        </div>
                        <div className='inputTableRow'>
                            <input type="checkbox"
                                checked={this.state.chorded}
                                onChange={this.handleChangeChords} />
                        </div>
                    </div>
                </div>
                <p><textarea rows={rows}
                    value={this.state.lyrics}
                    onChange={this.handleChamgeLyrics} /></p>
                <button onClick={this.handleSubmit}>tallenna</button>
                <button onClick={this.handleCancel}>peruuta</button>
            </div >
        )
    }
}

export default App;
