import React from 'react'

class LoginModal extends React.Component {
  state = {input: ''}

  handleInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  login = () => this.props.handleClickLogin(this.state.input)
  cancel = () => this.props.handleClickCancel()

  loginDialog = () => (
    <div>
    Password:
    <input type="text" onChange={this.handleInputChange} value={this.state.input} />
    <button onClick={this.login}>Log in</button>
    <button onClick={this.cancel}>Cancel</button>
    </div>
  )

  errorMessage = () => (
    <div>
    Login Failed!
    <button onClick={this.cancel}>OK</button>
    </div>
  )

render() {
  if (!this.props.show) return null

  const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width:'100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const modalBoxStyle = {
  maxWidth: '50%',
  color: 'black',
  padding: '30px',
  borderRadius: '20px',
  border: '1px solid red',
  backgroundColor: 'rgba(255,255,255,0.8)'
}

  return (
    <div style={modalStyle}>
      <section style={modalBoxStyle} className="login">
        {this.props.error ? this.errorMessage() : this.loginDialog()}
      </section>
    </div>
  )}
}

export default LoginModal
