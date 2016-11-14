import React, {
  Component,
  PropTypes,
} from 'react'

import ProdutosList from '@components/ProdutosList'

export default class RestauranteProdutos extends Component {

  static defaultProps = {}

  static propTypes = {
    produtos: PropTypes.array,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      produtos,
    } = this.props

    return (
      <div>
        <ProdutosList
          produtos={produtos}
          onDelete={produtoId => console.log('delete!')}
          onEdit={produtoId => console.log('edit!')}
        />
      </div>
    )
  }

}
