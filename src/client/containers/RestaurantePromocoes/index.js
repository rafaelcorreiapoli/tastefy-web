import { composeWithTracker } from 'react-komposer'
import RestaurantePromocoes from '@components/RestaurantePromocoes'
import Loading from '@components/Loading'
import Promocoes from '@collections/promocoes'
import { connect } from 'react-redux'
import Alert from 'react-s-alert'
import { closeModal, openModal } from '@ducks/deleteEntity'
import { call } from '@ducks/methods'
import withLinks from '@hocs/withLinks'

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

const mapDispatchToProps = dispatch => ({
  askToDelete(id, entityId, msg) {
    dispatch(openModal(id, entityId, msg))
  },
  deleteEntity(_id, modalId) {
    dispatch(call('Promocoes.methods.remove', { _id }))
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

const connected = connect(null, mapDispatchToProps)(RestaurantePromocoes)
export default withLinks(composeWithTracker(compose, Loading)(connected))
