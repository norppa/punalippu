import React from 'react'

class Search extends React.Component {
    state = {
        advanced: false
    }

    render() {
        return (
            <div>
                <input type='text'
                    onChange={this.props.changeSearchInput} />&emsp;^
            </div>

        )
    }

}

export default Search;
