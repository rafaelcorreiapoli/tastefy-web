import { composeWithTracker } from 'react-komposer'
import RestauranteProdutos from '@components/RestauranteProdutos'
import Loading from '@components/Loading'
import Produtos from '@collections/produtos'

const compose = ({ restauranteId }, onData) => {
  const handler = Meteor.subscribe('produtos.porRestaurante', {
    restauranteId,
  })

  if (handler.ready()) {
    const produtos = Produtos.find({
      restauranteId,
    }).fetch()

    onData(null, {
      produtos,
    })
  }
}


export default composeWithTracker(compose, Loading)(RestauranteProdutos)
