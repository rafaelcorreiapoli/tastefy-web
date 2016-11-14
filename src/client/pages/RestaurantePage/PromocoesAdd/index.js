import React, {
  Component,
  PropTypes,
} from 'react'
import PromocoesAdd from '@containers/PromocoesAdd'
import Panel from '@components/Panel'
import { Add } from '@resources/icons'
export default class PromocoesAddPage extends Component {

  static defaultProps = {}

  static propTypes = {
    params: PropTypes.shape({
      restauranteId: PropTypes.string,
    }),
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Panel title="Adicionar Promoção" icon={<Add />}>
        <PromocoesAdd
          restauranteId={this.props.params.restauranteId}
        />
      </Panel>
    )
  }

}
