import React, {
  Component,
  PropTypes,
} from 'react'
import QuestionariosList from '@components/QuestionariosList'


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
    } = this.props

    return (
      <div>
        <QuestionariosList
          questionarios={questionarios}
          onDelete={questionarioId => console.log('delete!')}
          onEdit={questionarioId => console.log('edit!')}
        />
      </div>
    )
  }
}
