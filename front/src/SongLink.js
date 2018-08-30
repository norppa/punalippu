import React from 'react'

class App extends React.Component {

    selectSong = () => this.props.selectSong(this.props.title)
    
    render() {
        const classes = "songlink" + (this.props.selected === 'true' ? " selectedsong" : "")
        return (
            <div className={classes}>
                <a onClick={this.selectSong}>
                {this.props.title}
                </a>
            </div >
        )
    }
}

export default App;
