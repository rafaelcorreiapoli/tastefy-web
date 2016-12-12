import React, {
  Component,
  PropTypes,
} from 'react'
import QuestionariosList from '@components/QuestionariosList'
import DeleteModal from '@components/DeleteModal'

export default class RestauranteQuestionarios extends Component {

  static defaultProps = {}

  static propTypes = {
    questionarios: PropTypes.array,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      questionarios,
      askToDelete,
      deleteEntity,
    } = this.props

    return (
      <div>
        <DeleteModal
          id={'restauranteQuestionarios'}
          deleteEntity={deleteEntity}
        />
        <QuestionariosList
          questionarios={questionarios}
          onDelete={questionarioId => askToDelete('restauranteQuestionarios', questionarioId, 'Deseja deletar?')}
          onEdit={questionarioId => console.log('edit!')}
        />
      </div>
    )
  }
}
