import React, { PropTypes } from 'react'
import { Check } from '@resources/icons'
const JUNGLE = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO03FkXI3ASKAWaEHgtDtU35qEBw7lWIHTo8KKkIfwMJAQNRasOA'

class MatchFound extends React.Component {
  static propTypes = {
    nick: PropTypes.string,
    email: PropTypes.string,
  }
  render() {
    const {
      nick,
      email,
      duoPicture,
      myPicture
    } = this.props
    return (
      <div style={{ textAlign: 'center' }}>
        <img src={myPicture} style={{borderRadius: '50%', width: 50, height: 50}} />
        <Check color="green" style={{ height: 50, width: 50 }} />
        <img src={duoPicture} style={{borderRadius: '50%', width: 50, height: 50}} />
        <h3 style={{ fontWeight: 200 }}>Nick: <b>{nick}</b></h3>
        <h3 style={{ fontWeight: 200 }}>E-mail: <b>{email}</b></h3>
        <h4 style={{ fontWeight: 200 }}>Um email foi enviado para o jogador avisando do match!</h4>
      </div>
    )
  }
}

export default MatchFound;
