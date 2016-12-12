import { connect } from 'react-redux'
import { Meteor } from 'meteor/meteor'
import { call, getMethodState } from '@ducks/methods'
import DeleteEntity from '@components/DeleteEntity'
import Alert from 'react-s-alert'
import { closeModal, getModalOpen, openModal } from '@ducks/deleteEntity'

// export default (id, method, getParams, getSuccessMsg, getErrorMsg) => {
//   const mapStateToProps = state => ({
//     modalOpen: getModalOpen(state, id),
//     loading: getMethodState(state, method).loading,
//     error: getMethodState(state, method).error,
//     success: getMethodState(state, method).success,
//   })
//
//   const mapDispatchToProps = dispatch => ({
//     delete(entityId) {
//       dispatch(call(method, getParams(entityId)))
//       .then((res) => {
//         dispatch(closeModal(entityId))
//         Alert.error(getSuccessMsg(res, entityId))
//       })
//       .catch((e) => {
//         dispatch(closeModal(entityId))
//         Alert.error(getErrorMsg(e, entityId))
//       })
//     },
//   })
//
//
//   return connect(mapStateToProps, mapDispatchToProps)(DeleteEntity)
// }

const mapStateToProps = (state, ownProps) => ({
  modalOpen: getModalOpen(state),
  loading: getMethodState(state, ownProps.method).loading,
  error: getMethodState(state, ownProps.method).error,
  success: getMethodState(state, ownProps.method).success,
  ...ownProps,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  askToDelete() {
    dispatch(openModal())
  },
  closeModal() {
    dispatch(closeModal())
  },
  deleteEntity(entityId) {
    const params = ownProps.getParams(entityId)
    dispatch(call(ownProps.method, params))
    .then((res) => {
      dispatch(closeModal(entityId))
      Alert.error(ownProps.getSuccessMsg(res, entityId))
    })
    .catch((e) => {
      dispatch(closeModal(entityId))
      Alert.error(ownProps.getErrorMsg(e, entityId))
    })
  },
})

// const mapDispatchToProps = (dispatch, ownProps) => ({
//   delete(entityId) {
//     dispatch(call(method, getParams(entityId)))
//     .then((res) => {
//       dispatch(closeModal(entityId))
//       Alert.error(getSuccessMsg(res, entityId))
//     })
//     .catch((e) => {
//       dispatch(closeModal(entityId))
//       Alert.error(getErrorMsg(e, entityId))
//     })
//   },
// })


export default connect(mapStateToProps, mapDispatchToProps)(DeleteEntity)
