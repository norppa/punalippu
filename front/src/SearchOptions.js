import React from 'react'

class SearchOptions extends React.Component {
    state = {}

    render() {
        return (
            <div>
                <input type='checkbox' onChange={this.props.toggleSearchLyrics} /> 
                Hae myös kappaleiden sanoista <br />
                <input type='checkbox' />Näytä vain soinnutetut <br />
                <input type='checkbox' onChange={this.props.toggleSearchRecordedOnly}/>
                Näytä vain taltioidut 
                <hr />
            </div>

        )
    }

}

export default SearchOptions;
