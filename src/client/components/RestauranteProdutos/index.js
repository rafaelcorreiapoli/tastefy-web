import React, {
  Component,
  PropTypes,
} from 'react'

import ProdutosList from '@components/ProdutosList'
import DeleteModal from '@components/DeleteModal'

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
      deleteEntity,
      askToDelete,
    } = this.props

    return (
      <div>
        <DeleteModal
          id={'restauranteProdutos'}
          deleteEntity={deleteEntity}
        />
        <ProdutosList
          produtos={produtos}
          onDelete={produtoId => askToDelete('restauranteProdutos', produtoId, 'Deseja deletar?')}
          onEdit={produtoId => console.log('edit!')}
        />
      </div>
    )
  }

}
