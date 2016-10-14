import { connect } from 'react-redux'
import App from '@components/App'


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onComponentWillMount() {
    },
  }
}

class AppContainer extends React.Component {
  componentWillMount() {
    const { onComponentWillMount } = this.props
    onComponentWillMount()
  }

  render() {
    return <App
      {...this.props}
    />
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AppContainer)
