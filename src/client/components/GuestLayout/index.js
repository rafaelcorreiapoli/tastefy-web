import React, {
  Component,
  PropTypes,
} from 'react'

export default class GuestLayout extends Component {

  static defaultProps = {}

  static propTypes = {
    children: PropTypes.node,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      children,
    } = this.props
    return (
      <div>
        {children}
      </div>
    )
  }

}
