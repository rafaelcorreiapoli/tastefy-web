import React from 'react'
import RestaurantesDashboard from '@containers/RestaurantesDashboard'

class RestaurantesPage extends React.Component {
  render() {
    return (
      <RestaurantesDashboard
        deleteEntityId={'restaurantes'}
      />
    )
  }
}

export default RestaurantesPage
