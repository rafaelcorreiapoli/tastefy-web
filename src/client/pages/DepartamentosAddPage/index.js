import React, { PropTypes } from 'react'
import DepartamentosAdd from '@containers/DepartamentosAdd'
import Panel from '@components/Panel'
import { Add } from '@resources/icons'

class DepartamentosAddPage extends React.Component {
  render() {
    return (
      <Panel title="Adicionar Departamento" icon={<Add />} style={{ width: 600, margin: 'auto' }}>
        <DepartamentosAdd />
      </Panel>
    )
  }
}

export default DepartamentosAddPage;
