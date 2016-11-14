import React, {
  Component,
  PropTypes,
} from 'react'

import Panel from '@components/Panel'
import ProdutosAdd from '@containers/ProdutosAdd'
import { Add } from '@resources/icons'
import withLinks from '@hocs/withLinks'
import FlatButton from 'material-ui/FlatButton'

class ProdutosAddPage extends Component {

  static defaultProps = {}

  static propTypes = {
    params: PropTypes.shape({
      restauranteId: PropTypes.string,
    }),
    go: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      params: {
        restauranteId,
      },
      go,
    } = this.props

    return (
      <div>
        <p>
          <a
            href="#" onTouchTap={() => go(`/restaurantes/${restauranteId}/`)}
          >
            Dashboard
          </a>{' '}
          &gt; Adicionar Produto
        </p>
        <Panel title="Adicionar produto" icon={<Add />}>
          <ProdutosAdd
            restauranteId={restauranteId}
          />
        </Panel>
      </div>
    )
  }
}

export default withLinks(ProdutosAddPage)
