import React, {
  Component,
  PropTypes,
} from 'react'
import QuestionariosAdd from '@containers/QuestionariosAdd'
import Panel from '@components/Panel'
import { Add } from '@resources/icons'

export default class QuestionariosAddPage extends Component {

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
      <Panel title="Adicionar Questionário" icon={<Add />} >
        <QuestionariosAdd
          restauranteId={this.props.params.restauranteId}
        />
      </Panel>
    )
  }

}
