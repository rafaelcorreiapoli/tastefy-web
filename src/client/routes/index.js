import React, { PropTypes } from 'react'
import { Router, IndexRoute, Route, browserHistory, IndexRedirect } from 'react-router'
import { syncHistoryWithStore, replace } from 'react-router-redux'
import AppContainer from '@containers/AppContainer'
import AuthenticatedLayout from '@components/AuthenticatedLayout'
import RestaurantesPage from '@pages/RestaurantesPage'
import UsersPage from '@pages/UsersPage'
import LoginScreen from '@pages/LoginScreen'
import RegistrarPontoPage from '@pages/RegistrarPontoPage'
import WelcomePage from '@pages/WelcomePage'
import UploaderPage from '@pages/UploaderPage'

import { UserAuthWrapper } from 'redux-auth-wrapper'
import { clearLogoutRequest } from '@ducks/login'
import { Meteor } from 'meteor/meteor'
import store from '../store'
const Loading = ({
  children,
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
    dispatch(clearLogoutRequest())
    dispatch(replace(newLoc))
  },
})

const Routes = () => (
  <Router history={syncHistoryWithStore(browserHistory, store)}>
    <Route path="/" component={AppContainer}>
      <Route component={AuthenticatedLayout}>
        <IndexRoute component={WelcomePage} />
        <Route path="restaurantes">
          <IndexRoute component={RestaurantesPage} />
        </Route>
        <Route path="usuarios" component={UsersPage} />
      </Route>
    </Route>
  </Router>
)

export default Routes
