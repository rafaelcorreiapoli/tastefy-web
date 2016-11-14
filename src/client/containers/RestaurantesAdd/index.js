import { connect } from 'react-redux'
import RestaurantesAddForm from '@components/RestaurantesAddForm'
import { call, getMethodState } from '@ducks/methods'
import Alert from 'react-s-alert'
import { reset } from 'redux-form'

const METHOD = 'Restaurantes.methods.insert'

const mapStateToProps = state => ({
  values: state.form.novoRestaurante && state.form.novoRestaurante.values,
  novoRestauranteLoading: getMethodState(state, METHOD).loading,
  novoRestauranteSuccess: getMethodState(state, METHOD).success,
  novoRestauranteError: getMethodState(state, METHOD).error,
})

const mapDispatchToProps = dispatch => ({
  onSubmit(values) {
    console.log(values)
    dispatch(call(METHOD, values))
    .then(() => {
      Alert.success('Restaurante criado')
      dispatch(reset('novoRestaurante'))
    })
    .catch((e) => {
      Alert.error('Algum erro ocorreu')
      console.log(e)
      //  dispatch(reset('novoRestaurante'))
    })
  },
})

const RestaurantesAdd = connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantesAddForm)

export default RestaurantesAdd
