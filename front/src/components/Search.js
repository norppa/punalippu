import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleDown, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons'

class Search extends React.Component {
    state = { display: 'none' }

    toggleAdvancedSearch = () => this.setState(prevState => ({ display: prevState.display ? '' : 'none' }))

    render() {
        return (
            <div className="search">
                <div className='searchBasic'>
                    <div className='searchBasicContainer'>
                        <input type='text' name='searchInput' onChange={this.props.handleSearchChange} />&emsp;
                        <FontAwesomeIcon icon={this.state.display ? faAngleDoubleDown : faAngleDoubleUp}
                            onClick={this.toggleAdvancedSearch} />
                    </div>
                </div>
                <div className='searchAdvanced' style={this.state}>
                    <input type='checkbox' name='searchLyrics'
                        onChange={this.props.handleSearchChange} />
                    Hae myös kappaleiden sanoista <br />
                    <input type='checkbox' name='searchChordedOnly'
                        onChange={this.props.handleSearchChange} />
                    Näytä vain soinnutetut <br />
                    <input type='checkbox' name='searchRecordedOnly'
                        onChange={this.props.handleSearchChange} />
                    Näytä vain taltioidut
                    <hr />
                </div>
            </div>

        )
    }

}

export default Search;
