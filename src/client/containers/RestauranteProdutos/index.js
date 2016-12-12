import { composeWithTracker } from 'react-komposer'
import RestauranteProdutos from '@components/RestauranteProdutos'
import Loading from '@components/Loading'
import Produtos from '@collections/produtos'
import { connect } from 'react-redux'
import Alert from 'react-s-alert'
import { closeModal, openModal } from '@ducks/deleteEntity'
import { call } from '@ducks/methods'

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

const mapDispatchToProps = dispatch => ({
  askToDelete(id, entityId, msg) {
    dispatch(openModal(id, entityId, msg))
  },
  deleteEntity(_id, modalId) {
    dispatch(call('Produtos.methods.remove', { _id }))
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


const connected = connect(null, mapDispatchToProps)(RestauranteProdutos)
export default composeWithTracker(compose, Loading)(connected)
