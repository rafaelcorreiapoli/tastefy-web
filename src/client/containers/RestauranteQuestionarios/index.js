import { composeWithTracker } from 'react-komposer'
import RestauranteQuestionarios from '@components/RestauranteQuestionarios'
import Loading from '@components/Loading'
import Questionarios from '@collections/questionarios'
import { connect } from 'react-redux'
import Alert from 'react-s-alert'
import { closeModal, openModal } from '@ducks/deleteEntity'
import { call } from '@ducks/methods'

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

const mapDispatchToProps = dispatch => ({
  askToDelete(id, entityId, msg) {
    dispatch(openModal(id, entityId, msg))
  },
  deleteEntity(_id, modalId) {
    dispatch(call('Questionarios.methods.remove', { _id }))
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

const connected = connect(null, mapDispatchToProps)(RestauranteQuestionarios)
export default composeWithTracker(compose, Loading)(connected)
