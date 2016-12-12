import { composeWithTracker } from 'react-komposer'
import RestauranteCupons from '@components/RestauranteCupons'
import Loading from '@components/Loading'
import Cupons from '@collections/cupons'
import Users from '@collections/users'
import { connect } from 'react-redux'
import Alert from 'react-s-alert'
import { closeModal, openModal } from '@ducks/deleteEntity'
import { call } from '@ducks/methods'
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
    dispatch(selectQrCode(token))
  },
  askToDelete(id, entityId, msg) {
    dispatch(openModal(id, entityId, msg))
  },
  deleteEntity(_id, modalId) {
    dispatch(call('Cupons.methods.remove', { _id }))
    .then((res) => {
      Alert.success('sucesso')
      dispatch(closeModal(modalId))
    })
    .catch((err) => {
      Alert.error(err.toString())
      dispatch(closeModal(modalId))
    })
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(composeWithTracker(compose, Loading)(RestauranteCupons))
