import React, { PropTypes } from 'react'
import { Logout } from '@resources/icons'
import { IconButton } from 'material-ui'

class WelcomeMessage extends React.Component {
  render() {
    const {
      name,
      picture,
      logout
    } = this.props
    return (
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', padding: 20, textAlign: 'center' }}>
        {(name && picture) &&
          <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img style={{ borderRadius: '50%', marginRight: 20 }} src={picture} />
            <b>{name}</b>
            <IconButton onTouchTap={logout}>

            <Logout style={{height: 50, width: 50, marginLeft: 20}} color="#d3d3d3" />
            </IconButton>
          </h2>
        }
        <h2 style={{ fontWeight: 200 }}>Nada melhor do que achar um parceiro ideal para se aventurar nas Ranqueadas.</h2>
        <h2 style={{ fontWeight: 200 }}>A Equipe do <b>Find Your Duo</b> faz isso para você da melhor forma possível!</h2>
      </div>

    )
  }
}

export default WelcomeMessage;
