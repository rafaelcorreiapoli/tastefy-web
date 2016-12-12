import { Map } from 'immutable'

export const OPEN_MODAL = 'deleteEntity/OPEN_MODAL'
export const CLOSE_MODAL = 'deleteEntity/CLOSE_MODAL'

export const openModal = (id, entityId, msg) => ({
  type: OPEN_MODAL,
  payload: {
    id,
    entityId,
    msg,
  },
})

export const closeModal = id => ({
  type: CLOSE_MODAL,
  payload: {
    id,
  },
})


export const getModalOpen = (state, id) => state.deleteEntity.getIn([id, 'modalOpen'], false)
export const getEntityId = (state, id) => state.deleteEntity.getIn([id, 'entityId'], '')
export const getMsg = (state, id) => state.deleteEntity.getIn([id, 'msg'], '')
const initialState = Map({
  modalOpen: false,
})

export default (state = initialState, action) => {
  const id = action && action.payload && action.payload.id
  switch (action.type) {
    case OPEN_MODAL:
      return state.setIn([id, 'modalOpen'], true)
        .setIn([id, 'entityId'], action.payload.entityId)
        .setIn([id, 'msg'], action.payload.msg)

    case CLOSE_MODAL:
      return state.setIn([id, 'modalOpen'], false)
    default:
      return state
  }
}
