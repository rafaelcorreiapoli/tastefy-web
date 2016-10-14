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
  onClickProfileLink: () => dispatch(push('/profile')),
  onClickHelpLink: () => dispatch(push('/help')),
  onClickLogoutLink: () => dispatch(logout()),
  onClickAddDepartamento: () => dispatch(push('/departamentos/add')),
  onClickAddSetor: () => dispatch(push('/setores/add')),
  onClickAddFuncionario: () => dispatch(push('/funcionarios/add')),
  onClickAddFalta: () => dispatch(push('/faltas/add')),
})

const composer = (props, onData) => {
  onData(null, {})
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(composeWithTracker(composer)(AppBar))
