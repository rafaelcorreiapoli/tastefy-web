import React, { PropTypes } from 'react'
import SetoresAdd from '@containers/SetoresAdd'
import Panel from '@components/Panel'
import { Add } from '@resources/icons'

class SetoresAddPage extends React.Component {
  render() {
    return (
      <Panel title="Adicionar Setor" icon={<Add />} style={{ width: 600, margin: 'auto' }}>
        <SetoresAdd />
      </Panel>
    )
  }
}

export default SetoresAddPage;
