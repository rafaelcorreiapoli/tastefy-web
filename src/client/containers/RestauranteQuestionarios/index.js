import { composeWithTracker } from 'react-komposer'
import RestauranteQuestionarios from '@components/RestauranteQuestionarios'
import Loading from '@components/Loading'

const compose = ({ restauranteId }, onData) => {
  const handler = Meteor.subscribe('questionarios.porRestaurante', {
    restauranteId,
  })

  if (handler.ready()) {
    onData(null, {
      promocoes: [],
    })
  }
}


export default composeWithTracker(compose, Loading)(RestauranteQuestionarios)
