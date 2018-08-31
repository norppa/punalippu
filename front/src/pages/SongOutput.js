import React from 'react'

class App extends React.Component {
    render() {
        return (
            <div>
                <h2>{this.props.song.name}</h2>
                <a href="">{this.props.song.recording}</a>
                <pre>
                    {this.props.song.name + '\n\n'}
                    {this.props.song.lyrics}
                </pre>
            </div>
        )
    }
}

export default App;
