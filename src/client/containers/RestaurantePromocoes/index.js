import { composeWithTracker } from 'react-komposer'
import RestaurantePromocoes from '@components/RestaurantePromocoes'
import Loading from '@components/Loading'

const compose = ({ restauranteId }, onData) => {
  const handler = Meteor.subscribe('promocoes.porRestaurante', {
    restauranteId,
  })

  if (handler.ready()) {
    onData(null, {
      promocoes: [],
    })
  }
}


export default composeWithTracker(compose, Loading)(RestaurantePromocoes)
