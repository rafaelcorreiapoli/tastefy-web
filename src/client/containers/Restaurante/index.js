import { composeWithTracker } from 'react-komposer'
import { Meteor } from 'meteor/meteor'
import Restaurantes from '@collections/restaurantes'
import Restaurante from '@components/Restaurante'

const compose = ({ restauranteId }, onData) => {
  const handler = Meteor.subscribe('restaurantes.single', {
    restauranteId,
  })

  if (handler.ready()) {
    const restaurante = Restaurantes.findOne({
      _id: restauranteId,
    })

    onData(null, {
      ...restaurante,
    })
  }
}

export default composeWithTracker(compose)(Restaurante)
