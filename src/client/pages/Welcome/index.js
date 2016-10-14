import React, { PropTypes } from 'react'
import MatchForm from '@components/MatchForm'
import Statistics from '@components/Statistics'
import WelcomeMessage from '@components/WelcomeMessage'
import Login from '@containers/Login'
import { Dialog, FlatButton } from 'material-ui'
import { composeWithTracker } from 'react-komposer'

const composer = (props, onData) => {
  const user = Meteor.user()
  if (!Meteor.loggingIn()) {
    onData(null, {
      user,
      logout: () => Meteor.logout()
    })
  }
}

class Welcome extends React.Component {
  static propTypes = {
    user: PropTypes.object,
  }
  render() {
    const {
      user,
      logout
    } = this.props
    return (
      <div style={{ display: 'flex', flexDirection: 'column', margin: 20 }}>
        Hello
      </div>
    )
  }
}

export default composeWithTracker(composer)(Welcome);
