import React, { PropTypes } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { Meteor } from 'meteor/meteor'
import { composeWithTracker } from 'react-komposer'

class WelcomePage extends React.Component {
  static propTypes = {
    nomeCompleto: PropTypes.string,
  }

  render() {
    const {
      nomeCompleto,
    } = this.props
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <h1>Bem-vindo, {nomeCompleto}</h1>
          </Col>
        </Row>
      </Grid>
    )
  }
}

const compose = (props, onData) => {
  const user = Meteor.user()
  if (user) {
    onData(null, {
      nomeCompleto: user.profile && user.profile.nomeCompleto,
    })
  }
}
export default composeWithTracker(compose)(WelcomePage)
