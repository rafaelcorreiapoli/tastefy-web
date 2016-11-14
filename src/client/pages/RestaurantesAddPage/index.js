import React, { PropTypes } from 'react'
import RestaurantesAdd from '@containers/RestaurantesAdd'
import Panel from '@components/Panel'
import { Add } from '@resources/icons'

class RestaurantesAddPage extends React.Component {
  render() {
    return (
      <Panel title="Adicionar Restaurante" icon={<Add />} style={{ width: 600, margin: 'auto' }}>
        <RestaurantesAdd />
      </Panel>
    )
  }
}

export default RestaurantesAddPage
