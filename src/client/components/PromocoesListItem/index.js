import React, {
  Component,
  PropTypes,
} from 'react'
import { TableRow, TableRowColumn } from 'material-ui/Table'
import { Edit, Remove } from '@resources/icons'
import IconButton from 'material-ui/IconButton'
import moment from 'moment'

const styles = {
  imagemUrl: {
    width: 50,
    height: 50,
  },
}
export default class PromocoesListItem extends Component {
  static defaultProps = {}

  static propTypes = {
    imagemUrl: PropTypes.string,
    nome: PropTypes.string,
    validoAte: PropTypes.object,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      imagemUrl,
      nome,
      validoAte,
      onDelete,
      onEdit,
    } = this.props
    return (
      <TableRow>
        <TableRowColumn><img src={imagemUrl} style={styles.imagemUrl} /></TableRowColumn>
        <TableRowColumn>{nome}</TableRowColumn>
        <TableRowColumn>{moment(validoAte).format('DD/MM/YYYY')}</TableRowColumn>
        <TableRowColumn>
          <IconButton
            onTouchTap={onDelete}
          >
            <Remove />
          </IconButton>
          <IconButton
            onTouchTap={onEdit}
          >
            <Edit />
          </IconButton>
        </TableRowColumn>
      </TableRow>
    )
  }

}
