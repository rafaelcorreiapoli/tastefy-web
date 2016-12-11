import React, { PropTypes } from 'react'
import { Router, IndexRoute, Route, browserHistory, IndexRedirect } from 'react-router'
import { syncHistoryWithStore, replace } from 'react-router-redux'
import AppContainer from '@containers/AppContainer'
import AuthenticatedLayout from '@components/AuthenticatedLayout'
import RestaurantesPage from '@pages/RestaurantesPage'
import RestaurantesAddPage from '@pages/RestaurantesAddPage'
import UsersPage from '@pages/UsersPage'
import LoginScreen from '@pages/LoginScreen'
import RegistrarPontoPage from '@pages/RegistrarPontoPage'
import WelcomePage from '@pages/WelcomePage'
import UploaderPage from '@pages/UploaderPage'
import Loading from '@components/Loading'
import UsersAddPage from '@pages/UsersAddPage'
import GuestLayout from '@components/GuestLayout'

import RestaurantePage, {
  RestauranteDashboard,
  PromocoesAdd,
  QuestionariosAdd,
  ProdutosAdd,
} from '@pages/RestaurantePage'

import { UserAuthWrapper } from 'redux-auth-wrapper'
import { clearLogoutRequest } from '@ducks/login'
import { Meteor } from 'meteor/meteor'
import store from '../store'

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
      <Route component={userIsAuthenticated(AuthenticatedLayout)}>
        <IndexRoute component={WelcomePage} />
        <Route path="restaurantes">
          <IndexRoute component={RestaurantesPage} />
          <Route path="add" component={RestaurantesAddPage} />
          <Route path=":restauranteId" component={RestaurantePage}>
            <IndexRoute component={RestauranteDashboard} />
            <Route path="promocoes/add" component={PromocoesAdd} />
            <Route path="questionarios/add" component={QuestionariosAdd} />A
            <Route path="produtos/add" component={ProdutosAdd} />A
          </Route>
        </Route>
        <Route path="usuarios">
          <IndexRoute component={UsersPage} />
          <Route path="add" component={UsersAddPage} />
        </Route>
      </Route>

      <Route component={GuestLayout}>
        <Route path="/login" component={LoginScreen} />
      </Route>
    </Route>
  </Router>
)

export default Routes
