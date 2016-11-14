import React, {
  Component,
  PropTypes,
} from 'react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table'
import GenericTableRow from '@components/GenericTableRow'

export default class GenericTable extends Component {

  static defaultProps = {}

  static propTypes = {
    data: PropTypes.array,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    headers: PropTypes.array,
    getRowData: PropTypes.func,
    renderActions: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      data,
      onDelete,
      onEdit,
      headers,
      getRowData,
      renderActions,
    } = this.props

    return (
      <Table>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            {
              headers && headers.map((header, i) => (
                <TableHeaderColumn key={i}>{header}</TableHeaderColumn>
              ))
            }
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {
            data && data.map((row, i) => {
              const rowData = getRowData(row)
              return (
                <GenericTableRow
                  key={i}
                  data={rowData}
                  onDelete={() => onDelete(row._id)}
                  onEdit={() => onEdit(row._id)}
                  renderActions={renderActions}
                />
              )
            })
          }
        </TableBody>
      </Table>
    )
  }

}
