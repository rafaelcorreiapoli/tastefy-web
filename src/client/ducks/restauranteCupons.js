import { Map } from 'immutable'

export const CLOSE_QR_CODE_DIALOG = 'restauranteCupons/CLOSE_QR_CODE_DIALOG'
export const SELECT_QR_CODE = 'restauranteCupons/SELECT_QR_CODE'

export const getQrCodeDialogOpen = state => state.restauranteCupons.get('qrCodeDialogOpen')
export const getSelectedToken = state => state.restauranteCupons.get('selectedToken')

export const selectQrCode = token => ({
  type: SELECT_QR_CODE,
  payload: {
    token,
  },
})

export const closeQrCodeDialog = () => ({
  type: CLOSE_QR_CODE_DIALOG,
  payload: {},
})

const initialState = Map({
  selectedToken: null,
  qrCodeDialogOpen: false,
})
export default (state = initialState, action) => {
  switch (action.type) {
    case CLOSE_QR_CODE_DIALOG:
      return state.set('qrCodeDialogOpen', false)
        .set('selectedToken', null)
    case SELECT_QR_CODE:
      return state.set('qrCodeDialogOpen', true)
        .set('selectedToken', action.payload.token)
    default:
      return state
  }
}
