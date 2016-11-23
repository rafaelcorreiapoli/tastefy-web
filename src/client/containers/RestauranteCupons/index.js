import { composeWithTracker } from 'react-komposer'
import RestauranteCupons from '@components/RestauranteCupons'
import Loading from '@components/Loading'
import Cupons from '@collections/cupons'
import Users from '@collections/users'
import { connect } from 'react-redux'
import {
  closeQrCodeDialog,
  selectQrCode,
  getQrCodeDialogOpen,
  getSelectedToken,
} from '@ducks/restauranteCupons'


const compose = ({ restauranteId }, onData) => {
  const handler = Meteor.subscribe('cupons.porRestaurante', {
    restauranteId,
  })

  if (handler.ready()) {
    const cupons = Cupons.find({
      restauranteId,
    }).map((cupom) => {
      const user = Users.findOne({ _id: cupom.geradoPor })

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

const mapStateToProps = state => ({
  qrCodeDialogOpen: getQrCodeDialogOpen(state),
  selectedToken: getSelectedToken(state),
})

const mapDispatchToProps = dispatch => ({
  closeQrCodeDialog() {
    dispatch(closeQrCodeDialog())
  },
  selectQrCode(token) {
    console.log(token)
    dispatch(selectQrCode(token))
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(composeWithTracker(compose, Loading)(RestauranteCupons))
