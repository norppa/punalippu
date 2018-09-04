import React from 'react'

const buttons = {
    left: [
        ['add', 'Lisää'],
        ['edit', 'Muokkaa'],
        ['del', 'Poista']
    ],
    right: [
        ['logout', 'Kirjaudu ulos']
    ]
}

class AdminPanel extends React.Component {

    handleClick = (eventName) => () => {
        if (eventName === 'logout') {
            return this.props.administer(eventName)
        }
        if (!this.props.edit) {
            this.props.administer(eventName)
        }
    }

    button = (eventName, label) => {
        const classes = 'adminButton' + (eventName !== 'logout' && this.props.edit ? ' disabled' : '')
        return (
            <span onClick={this.handleClick(eventName)}
                className={classes}
                style={{width: `${label.length}ch`}}>
                {label}
            </span >
        )
    }

    render() {

        return (
            <div className="row">
                <div className="col dark adminPanel">
                
                    <div className="ap-left">
                        {buttons.left.map(item => this.button(item[0], item[1]))}    
                    </div>
                    <div className='ap-right'>

                        {this.button('logout', 'Kirjaudu ulos')}
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminPanel