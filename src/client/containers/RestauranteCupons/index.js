import { composeWithTracker } from 'react-komposer'
import RestauranteCupons from '@components/RestauranteCupons'
import Loading from '@components/Loading'
import Cupons from '@collections/cupons'
import Users from '@collections/users'

const compose = ({ restauranteId }, onData) => {
  const handler = Meteor.subscribe('cupons.porRestaurante', {
    restauranteId,
  })

  if (handler.ready()) {
    const cupons = Cupons.find({
      restauranteId,
    }).map((cupom) => {
      const user = Users.findOne({ _id: cupom.geradoPor });

      return {
        ...cupom,
        geradoPor: user && user.profile ? user.profile.nomeCompleto : '-',
      }
    })

    onData(null, {
      cupons,
    })
  }
}


export default composeWithTracker(compose, Loading)(RestauranteCupons)
