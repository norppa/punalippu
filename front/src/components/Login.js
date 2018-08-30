import React from 'react'

class Login extends React.Component {
    state = { password: '' }

    handleChange = (event) => this.setState({ password: event.target.value })
    submit = (event) => {
        event.preventDefault()
        this.props.submit(this.state.password)
    }

    render() {
        return (
            <div className="login row">
                <div className="dark">
                    <form onSubmit={this.submit} >
                        Salasana <input type='text'
                            value={this.state.password}
                            onChange={this.handleChange} 
                            autoFocus/>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login