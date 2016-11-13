import React, {
  Component,
} from 'react'
import MDSpinner from 'react-md-spinner'

export default class Loading extends Component {

  static defaultProps = {}

  static propTypes = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <MDSpinner />
      </div>
    )
  }

}
