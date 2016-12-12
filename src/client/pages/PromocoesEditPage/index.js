import React, {
  Component,
  PropTypes,
} from 'react'
import PromocoesEdit from '@containers/PromocoesEdit'
import Panel from '@components/Panel'
import { Edit } from '@resources/icons'
import { PRIMARY_COLOR } from '@resources/colors'
import withLinks from '@hocs/withLinks'

class PromocoesEditPage extends Component {

  static defaultProps = {}

  static propTypes = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      params: {
        promocaoId,
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
          &gt; Editar Promoção
        </p>

        <Panel title="Editar Promoção" icon={<Edit />}>
          <PromocoesEdit
            promocaoId={promocaoId}
            restauranteId={restauranteId}
            buttonLabel={'Editar'}
          />
        </Panel>
      </div>
    )
  }
}

export default withLinks(PromocoesEditPage)
