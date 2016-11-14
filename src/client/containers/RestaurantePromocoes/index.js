import { composeWithTracker } from 'react-komposer'
import RestaurantePromocoes from '@components/RestaurantePromocoes'
import Loading from '@components/Loading'
import Promocoes from '@collections/promocoes'

const compose = ({ restauranteId }, onData) => {
  const handler = Meteor.subscribe('promocoes.porRestaurante', {
    restauranteId,
  })

  if (handler.ready()) {
    const promocoes = Promocoes.find({
      restauranteId,
    }).fetch()

    onData(null, {
      promocoes,
    })
  }
}


export default composeWithTracker(compose, Loading)(RestaurantePromocoes)
