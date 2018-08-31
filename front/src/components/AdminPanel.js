import React from 'react'

class AdminPanel extends React.Component {

    render() {
        return (
            <div>
                <hr />
                <button name='add' onClick={this.props.administer}>Lisää</button>
                <button name='edit' onClick={this.props.administer}>Muokkaa</button>
                <button name='del' onClick={this.props.administer}>Poista</button>
                <button name='logout' onClick={this.props.administer}>Kirjaudu ulos</button>
            </div>
        )
    }
}

export default AdminPanel