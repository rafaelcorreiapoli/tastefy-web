import React, { PropTypes } from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {
  Checkbox,
} from 'material-ui'
import { getColorForArea } from '@utils/get_color'

class FuncoesCheckTable extends React.Component {
  static propTypes = {
    options: PropTypes.array,
    input: PropTypes.object,
  }
  render() {
    const {
      options,
      input: {
        value: {
          exerce = [],
          toparia = [],
        },
        onChange,
      },
    } = this.props
    return (
      <Table>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false} selectable={false}>
          <TableRow>
            <TableHeaderColumn />
            <TableHeaderColumn style={{ textAlign: 'center' }}>Exerce</TableHeaderColumn>
            <TableHeaderColumn style={{ textAlign: 'center' }}>Toparia Exercer</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {
            options.map(area => {
              const headerRow =
              (<TableRow key={area.value} selectable={false} displayBorder={false}>
                <TableRowColumn colSpan={3} style={{ display: 'flex', alignItems: 'center' }}>
                  <h2 style={{ color: getColorForArea(area.value), margin: 0 }}>
                    {area.label}
                  </h2>
                </TableRowColumn>
              </TableRow>)
              const funcoesRow = area.funcoes.map(funcao => (
                <TableRow key={funcao.value} selectable={false} hoverable>
                  <TableRowColumn>
                    <span style={{ marginLeft: 20 }}>
                      {funcao.label}
                    </span>
                  </TableRowColumn>
                  <TableRowColumn style={{ alignItems: 'center' }}>
                    <Checkbox
                      iconStyle={{
                        fill: getColorForArea(area.value),
                      }}
                      onCheck={(e, checked) => {
                        let newValue
                        if (checked) {
                          // newValue = exerce.concat(funcao.value)
                          newValue = {
                            exerce: exerce.concat(funcao.value),
                            toparia,
                            // : toparia.indexOf(funcao.value) === -1 ? toparia.concat(funcao.value) : toparia
                          }
                        } else {
                          newValue = {
                            exerce: exerce.filter(f => f !== funcao.value),
                            toparia,
                          }
                        }

                        onChange(newValue)
                      }}
                      checked={exerce.indexOf(funcao.value) !== -1}
                      style={{ width: 'initial', margin: 'auto' }}
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    <Checkbox
                      iconStyle={{
                        fill: getColorForArea(area.value),
                      }}
                      onCheck={(e, checked) => {
                        let newValue
                        if (checked) {
                          // newValue = exerce.concat(funcao.value)
                          newValue = {
                            toparia: toparia.concat(funcao.value),
                            exerce,
                          }
                        } else {
                          newValue = {
                            toparia: toparia.filter(f => f !== funcao.value),
                            exerce,
                          }
                        }

                        onChange(newValue)
                      }}
                      disabled={exerce.indexOf(funcao.value) !== -1}
                      checked={toparia.indexOf(funcao.value) !== -1 || exerce.indexOf(funcao.value) !== -1}
                      style={{ width: 'initial', margin: 'auto' }}
                    />
                  </TableRowColumn>
                </TableRow>
              ))

              return [headerRow, funcoesRow]
            })

          }
        </TableBody>
      </Table>
    )
  }
}


export default FuncoesCheckTable
