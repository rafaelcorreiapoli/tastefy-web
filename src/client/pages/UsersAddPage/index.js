import React, { PropTypes } from 'react'
import UsersAdd from '@containers/UsersAdd'
import Panel from '@components/Panel'
import { Add } from '@resources/icons'

class UsersAddPage extends React.Component {
  render() {
    return (
      <Panel title="Adicionar Usuário" icon={<Add />} style={{ width: 600, margin: 'auto' }}>
        <UsersAdd />
      </Panel>
    )
  }
}

export default UsersAddPage
