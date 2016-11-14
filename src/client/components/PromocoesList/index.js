import React, {
  Component,
  PropTypes,
} from 'react'
import GenericTable from '@components/GenericTable'
import moment from 'moment'

export default class PromocoesList extends Component {

  static defaultProps = {}

  static propTypes = {
    promocoes: PropTypes.array,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      promocoes,
      onDelete,
      onEdit,
    } = this.props

    return (
      <GenericTable
        data={promocoes}
        headers={[
          'Imagem',
          'Nome',
          'Valido Até',
          'Ações',
        ]}
        getRowData={promocao => ([
          <img src={promocao.imagemUrl} style={{ width: 50, height: 50 }} />,
          promocao.nome,
          moment(promocao.validoAte).format('DD/MM/YYYY'),
        ])}
        renderActions
        onDelete={id => onDelete(id)}
        onEdit={id => onEdit(id)}
      />
    )
  }

}
