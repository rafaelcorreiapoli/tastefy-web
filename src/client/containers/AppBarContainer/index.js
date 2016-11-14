import React from 'react';
import { connect } from 'react-redux'
import { push } from 'react-router-redux';
import { setDrawerOpen, setInsertBotDialogOpen } from '@ducks/layout'
import { logout } from '@ducks/login'
import AppBar from '@components/AppBar'
import { Meteor } from 'meteor/meteor'
import { composeWithTracker } from 'react-komposer'
import { call } from '@ducks/methods'

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = dispatch => ({
  onClickToggleMenu: () => dispatch(setDrawerOpen(true)),
  go(where) {
    dispatch(setDrawerOpen(false))
    dispatch(push(where))
  },
  onClickLogoutLink: () => dispatch(logout()),
})

const composer = (props, onData) => {
  onData(null, {})
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(composeWithTracker(composer)(AppBar))
