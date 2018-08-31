import React from 'react'

class AdminPanel extends React.Component {

    render() {
        return (
            <div>
                <hr />
                <button name='add' disabled={this.props.edit} onClick={this.props.administer}>Lisää</button>
                <button name='edit' disabled={this.props.edit} onClick={this.props.administer}>Muokkaa</button>
                <button name='del' disabled={this.props.edit} onClick={this.props.administer}>Poista</button>
                <button name='logout' disabled={this.props.edit} onClick={this.props.administer}>Kirjaudu ulos</button>
            </div>
        )
    }
}

export default AdminPanel