import React, { PropTypes } from 'react'
import { Router, IndexRoute, Route, browserHistory, IndexRedirect } from 'react-router'
import { syncHistoryWithStore, replace } from 'react-router-redux'
import AppContainer from '@containers/AppContainer';
import AuthenticatedLayout from '@components/AuthenticatedLayout'
import FaltasAddPage from '@pages/FaltasAddPage'
import DepartamentosPage from '@pages/DepartamentosPage'
import DepartamentosAddPage from '@pages/DepartamentosAddPage'
import SetoresPage from '@pages/SetoresPage'
import SetoresAddPage from '@pages/SetoresAddPage'
import FuncionariosPage from '@pages/FuncionariosPage'
import FuncionariosAddPage from '@pages/FuncionariosAddPage'
import UsuariosPage from '@pages/UsuariosPage'
import LoginScreen from '@pages/LoginScreen'
import RegistrarPontoPage from '@pages/RegistrarPontoPage'
import WelcomePage from '@pages/WelcomePage'
import UploaderPage from '@pages/UploaderPage'

import { UserAuthWrapper } from 'redux-auth-wrapper'
import { clearLogoutRequest } from '@ducks/login'
import { Meteor } from 'meteor/meteor'
import store from '../store'
const Loading = ({
  children
}) => {
  return (
    <div>
      User is authenticating...
    </div>
  )
}

const userIsAuthenticated = UserAuthWrapper({
  wrapperDisplayName: 'UserIsAuthenticated',
  authSelector: state => state.user.user,
  authenticatingSelector: state => !state.login.get('isMeteorUserFetched'),
  LoadingComponent: Loading,
  redirectAction: newLoc => (dispatch, getState) => {
    //  se o usuário clicou no botão de logout, vou mandá-lo para a tela de login sem o redirect
    const state = getState()
    if (state.login.get('logoutRequest')) {
      delete newLoc.query.redirect
    }
    dispatch(clearLogoutRequest());
    dispatch(replace(newLoc))
  },
})

const Routes = () => (
  <Router history={syncHistoryWithStore(browserHistory, store)}>
    <Route path="/" component={AppContainer}>
      <Route component={AuthenticatedLayout}>
        <IndexRoute component={WelcomePage} />
        <Route path="departamentos">
          <IndexRoute component={DepartamentosPage} />
          <Route path="add" component={DepartamentosAddPage} />
        </Route>
        <Route path="setores">
          <IndexRoute component={SetoresPage} />
          <Route path="add" component={SetoresAddPage} />
        </Route>
        <Route path="funcionarios">
          <IndexRoute component={FuncionariosPage} />
          <Route path="add" component={FuncionariosAddPage} />
        </Route>
        <Route path="faltas">
          <Route path="add" component={FaltasAddPage} />
        </Route>
        <Route path="usuarios" component={UsuariosPage} />
        <Route path="registrar-ponto" component={RegistrarPontoPage} />
        <Route path="upload" component={UploaderPage} />
      </Route>
    </Route>
  </Router>
)

export default Routes
