import React, { PropTypes } from 'react'
import Alert from 'react-s-alert';

class App extends React.Component {
  static displayName = 'App'
  static propTypes = {
    children: PropTypes.node,
  }
  render() {
    const {
      children,
    } = this.props

    return (
      <div>
        {children}
        <Alert
          stack={{
            limit: 3,
          }}
          position="top-right"
          effect="slide"
        />
      </div>
    )
  }
}

export default App;
