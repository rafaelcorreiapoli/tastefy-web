import React, {
  Component,
  PropTypes,
} from 'react'
import { openModal } from '@ducks/deleteEntity'
import { connect } from 'react-redux'

export default (ComposedComponent) => {
  const mapDispatchToProps = dispatch => ({
    askToDelete(entityId, msg) {
      dispatch(openModal(entityId, msg))
    },
  })

  return connect(null, mapDispatchToProps)(ComposedComponent)
}
