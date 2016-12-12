import React, { PropTypes } from 'react'
import Alert from 'react-s-alert'
import DeleteModal from '@components/DeleteModal'

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
        <DeleteModal />
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

export default App
