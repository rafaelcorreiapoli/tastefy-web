import React, {
  Component,
  PropTypes,
} from 'react'
import PromocoesList from '@components/PromocoesList'
import DeleteModal from '@components/DeleteModal'

export default class RestaurantePromocoes extends Component {
  static defaultProps = {}

  static propTypes = {
    promocoes: PropTypes.array,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      promocoes,
      onDelete,
      onEdit,
      deleteEntity,
      askToDelete,
    } = this.props

    return (
      <div>
        <DeleteModal
          id={'restaurantePromocoes'}
          deleteEntity={deleteEntity}
        />
        <PromocoesList
          promocoes={promocoes}
          onDelete={promocaoId => askToDelete('restaurantePromocoes', promocaoId, 'Deseja deletar?')}
          onEdit={promocaoId => console.log('edit!')}
        />
      </div>
    )
  }
}
