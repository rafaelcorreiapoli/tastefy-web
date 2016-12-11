import React, {
  Component,
  PropTypes,
} from 'react'
import QuestionariosAdd from '@containers/QuestionariosAdd'
import Panel from '@components/Panel'
import { Add } from '@resources/icons'
import withLinks from '@hocs/withLinks'
import { PRIMARY_COLOR } from '@resources/colors'

class QuestionariosAddPage extends Component {

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
          &gt; Adicionar Questionário
        </p>
        <Panel title="Adicionar Questionário" icon={<Add />} >
          <QuestionariosAdd
            restauranteId={this.props.params.restauranteId}
          />
        </Panel>
      </div>
    )
  }

}

export default withLinks(QuestionariosAddPage)
