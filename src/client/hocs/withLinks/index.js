import { connect } from 'react-redux'
import { push } from 'react-router-redux'

export default ComposedComponent =>
  connect(null, dispatch => ({
    go(where) {
      dispatch(push(where))
    },
  }))(ComposedComponent)
