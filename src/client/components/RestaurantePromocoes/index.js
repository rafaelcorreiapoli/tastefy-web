import React, {
  Component,
  PropTypes,
} from 'react'
import PromocoesList from '@components/PromocoesList'

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
    } = this.props

    return (
      <div>
        <PromocoesList
          promocoes={promocoes}
          onDelete={(promocaoId) => console.log('delete!')}
          onEdit={(promocaoId) => console.log('edit!')}
        />
      </div>
    )
  }

}
