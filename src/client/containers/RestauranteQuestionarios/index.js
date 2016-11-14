import { composeWithTracker } from 'react-komposer'
import RestauranteQuestionarios from '@components/RestauranteQuestionarios'
import Loading from '@components/Loading'
import Questionarios from '@collections/questionarios'

const compose = ({ restauranteId }, onData) => {
  const handler = Meteor.subscribe('questionarios.porRestaurante', {
    restauranteId,
  })

  if (handler.ready()) {
    const questionarios = Questionarios.find({
      restauranteId,
    }).fetch()

    onData(null, {
      questionarios,
    })
  }
}


export default composeWithTracker(compose, Loading)(RestauranteQuestionarios)
