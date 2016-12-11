import React, {
  Component,
  PropTypes,
} from 'react'
import PromocoesAdd from '@containers/PromocoesAdd'
import Panel from '@components/Panel'
import { Add } from '@resources/icons'
import { PRIMARY_COLOR } from '@resources/colors'
import withLinks from '@hocs/withLinks'

class PromocoesAddPage extends Component {

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
          <span
            style={{
              color: PRIMARY_COLOR,
            }}
            onTouchTap={() => go(`/restaurantes/${restauranteId}/`)}
          >
            Dashboard
          </span>{' '}
          &gt; Promoções
        </p>

        <Panel title="Adicionar Promoção" icon={<Add />}>
          <PromocoesAdd
            restauranteId={restauranteId}
          />
        </Panel>
      </div>
    )
  }
}

export default withLinks(PromocoesAddPage)
