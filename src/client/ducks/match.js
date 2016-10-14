const SET_DIALOG_STATE = 'match/SET_DIALOG_STATE'
const SET_MATCH_FOUND = 'match/SET_MATCH_FOUND'

import { call } from '@ducks/methods'

export const setDialogState = (dialogOpen) => ({
  type: SET_DIALOG_STATE,
  payload: {
    dialogOpen,
  },
})

export const setMatchFound = (matchFound) => ({
  type: SET_MATCH_FOUND,
  payload: {
    matchFound,
  },
})

export const newSearch = (values) => dispatch => {
  dispatch(call('search', values))
  .then(res => {
    dispatch(setMatchFound(res))
  })
  .catch(err => {
    console.log(err)
  })
}



const initialState = {
  dialogOpen: false,
  matchFound: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DIALOG_STATE:
      return Object.assign({}, state, { dialogOpen: action.payload.dialogOpen })
    case SET_MATCH_FOUND:
      return Object.assign({}, state, { matchFound: action.payload.matchFound })
    default:
      return state
  }
}
