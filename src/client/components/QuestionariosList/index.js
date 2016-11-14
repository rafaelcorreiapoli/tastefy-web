import React, {
  Component,
  PropTypes,
} from 'react'
import GenericTable from '@components/GenericTable'

export default class QuestionariosList extends Component {

  static defaultProps = {}

  static propTypes = {
    questionarios: PropTypes.array,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      questionarios,
      onDelete,
      onEdit,
    } = this.props

    return (
      <GenericTable
        data={questionarios}
        headers={[
          'Nome',
          'Tempo médio',
          'Ações',
        ]}
        getRowData={questionario => ([
          questionario.nome,
          `${questionario.tempoMedio} min`,
        ])}
        renderActions
        onDelete={id => onDelete(id)}
        onEdit={id => onEdit(id)}
      />
    )
  }

}
