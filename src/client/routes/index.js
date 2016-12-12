import React, { PropTypes } from 'react'
import { Router, IndexRoute, Route, browserHistory, IndexRedirect } from 'react-router'
import { syncHistoryWithStore, replace } from 'react-router-redux'
import AppContainer from '@containers/AppContainer'
import AuthenticatedLayout from '@components/AuthenticatedLayout'
import RestaurantesPage from '@pages/RestaurantesPage'
import RestaurantesAddPage from '@pages/RestaurantesAddPage'
import UsersPage from '@pages/UsersPage'
import LoginScreen from '@pages/LoginScreen'
import WelcomePage from '@pages/WelcomePage'
import Loading from '@components/Loading'
import UsersAddPage from '@pages/UsersAddPage'
import GuestLayout from '@components/GuestLayout'
import authWrapper from '@hocs/authWrapper'
import PromocoesEditPage from '@pages/PromocoesEditPage'

import RestaurantePage, {
  RestauranteDashboard,
  PromocoesAdd,
  QuestionariosAdd,
  ProdutosAdd,
} from '@pages/RestaurantePage'

import store from '../store'

const Routes = () => (
  <Router history={syncHistoryWithStore(browserHistory, store)}>
    <Route path="/" component={AppContainer}>
      <Route component={authWrapper(AuthenticatedLayout)}>
        <IndexRoute component={WelcomePage} />
        <Route path="restaurantes">
          <IndexRoute component={RestaurantesPage} />
          <Route path="add" component={RestaurantesAddPage} />
          <Route path=":restauranteId" component={RestaurantePage}>
            <IndexRoute component={RestauranteDashboard} />
            <Route path="promocoes/add" component={PromocoesAdd} />
            <Route path="questionarios/add" component={QuestionariosAdd} />A
            <Route path="produtos/add" component={ProdutosAdd} />A
            <Route path="promocoes/:promocaoId/edit" component={PromocoesEditPage} />
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
