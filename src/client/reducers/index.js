import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'
import counter from '@ducks/counter'
import methods from '@ducks/methods'
import login from '@ducks/login'
import layout from '@ducks/layout'
import user from '@ducks/user'
import match from '@ducks/match'
import autenticarPonto from '@ducks/autenticarPonto'
import uploader from '@ducks/uploader'
import search from '@ducks/search'
import dashboard from 'ducks-dashboard'
import restauranteCupons from '@ducks/restauranteCupons'
import deleteEntity from '@ducks/deleteEntity'

const rootReducer = combineReducers({
  form: formReducer,
  routing: routerReducer,
  methods,
  counter,
  login,
  layout,
  user,
  match,
  autenticarPonto,
  uploader,
  search,
  dashboard,
  restauranteCupons,
  deleteEntity,
})

export default rootReducer
