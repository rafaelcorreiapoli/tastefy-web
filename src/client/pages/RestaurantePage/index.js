import React, {
  Component,
  PropTypes,
} from 'react'

import Restaurante from '@containers/Restaurante'
export RestauranteDashboard from './Dashboard'
export ProdutosAdd from './ProdutosAdd'
export PromocoesAdd from './PromocoesAdd'
export QuestionariosAdd from './QuestionariosAdd'

export default class RestaurantePage extends Component {

  static defaultProps = {}

  static propTypes = {
    children: PropTypes.node,
    params: PropTypes.shape({
      restauranteId: PropTypes.string,
    }),
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
      <Restaurante
        restauranteId={this.props.params.restauranteId}
      >
        {children}
      </Restaurante>
    )
  }

}
