import React, {
  Component,
  PropTypes,
} from 'react'
import { push } from 'react-router-redux'
import { composeWithTracker } from 'react-komposer'
import { connect } from 'react-redux'


export default (ComposedComponent) => {
  const compose = (props, onData) => {
    const user = Meteor.user()

    onData(null, {
      loggedIn: !!user,
    })
  }

  const mapDispatchToProps = dispatch => ({
    goToLoginPage() {
      dispatch(push('/login'))
    },
  })

  class AuthWrapper extends Component {
    static defaultProps = {}

    static propTypes = {
      loggedIn: PropTypes.bool,
      goToLoginPage: PropTypes.func,
    }

    componentWillReceiveProps(nextProps) {
      this._checkAuthenticated(nextProps)
    }

    _checkAuthenticated(props) {
      const {
        loggedIn,
        goToLoginPage,
      } = props

      if (!loggedIn) {
        goToLoginPage()
      }
    }

    componentWillMount() {
      this._checkAuthenticated(this.props)
    }
    constructor(props) {
      super(props)
      this.state = {}
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      )
    }
  }

  const tracker = composeWithTracker(compose)(AuthWrapper)
  const connected = connect(null, mapDispatchToProps)(tracker)
  return connected
}
