import React, { PropTypes } from 'react'
import Login from '@containers/Login'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginTop: 200,
  },
  login: {
    marginTop: 20,
  },
}
class LoginScreen extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <h1 style={styles.logo}>Tastefy</h1>
        <Login
          style={styles.login}
          redirect={this.props.location.query.redirect}
        />
      </div>
    )
  }
}

export default LoginScreen
