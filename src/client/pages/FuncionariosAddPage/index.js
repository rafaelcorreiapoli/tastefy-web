import React, { PropTypes } from 'react'
import FuncionariosAdd from '@containers/FuncionariosAdd'
import Panel from '@components/Panel'
import { Add } from '@resources/icons'

class FuncionariosAddPage extends React.Component {
  render() {
    return (
      <Panel title="Adicionar Funcionário" icon={<Add />} style={{ width: 800, margin: 'auto' }}>
        <FuncionariosAdd />
      </Panel>
    )
  }
}

export default FuncionariosAddPage;
