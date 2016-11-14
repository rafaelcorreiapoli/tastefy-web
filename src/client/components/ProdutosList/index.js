import React, {
  Component,
  PropTypes,
} from 'react'
import GenericTable from '@components/GenericTable'

export default class ProdutosList extends Component {

  static defaultProps = {}

  static propTypes = {
    produtos: PropTypes.array,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      produtos,
      onDelete,
      onEdit,
    } = this.props

    return (
      <GenericTable
        data={produtos}
        headers={[
          'Imagem',
          'Nome',
          'Desconto',
          'Ações',
        ]}
        getRowData={produto => ([
          <img src={produto.imagemUrl} style={{ width: 50, height: 50 }} />,
          produto.nome,
          `${produto.desconto} %`,
        ])}
        renderActions
        onDelete={id => onDelete(id)}
        onEdit={id => onEdit(id)}
      />
    )
  }

}
