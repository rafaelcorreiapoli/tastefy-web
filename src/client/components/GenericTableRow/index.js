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
export default class GenericTableRow extends Component {
  static defaultProps = {}

  static propTypes = {
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    data: PropTypes.array,
    renderActions: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      onDelete,
      onEdit,
      data,
      renderActions,
    } = this.props
    return (
      <TableRow>
        {data && data.map((d, i) => (
          <TableRowColumn key={i}>{d}</TableRowColumn>
        ))}
        {
          renderActions &&
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
        }

      </TableRow>
    )
  }

}
