import React, {
  Component,
  PropTypes,
} from 'react'
import CuponsList from '@components/CuponsList'


export default class RestauranteCupons extends Component {

  static defaultProps = {}

  static propTypes = {
    cupons: PropTypes.array,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      cupons,
    } = this.props

    return (
      <div>
        <CuponsList
          cupons={cupons}
          onDelete={questionarioId => console.log('delete!')}
          onEdit={questionarioId => console.log('edit!')}
        />
      </div>
    )
  }
}
