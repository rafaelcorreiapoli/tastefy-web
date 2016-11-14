import { connect } from 'react-redux'
import PromocoesAddForm from '@components/PromocoesAddForm'
import { call, getMethodState } from '@ducks/methods'
import Alert from 'react-s-alert'
import { reset } from 'redux-form'

const METHOD = 'Promocoes.methods.insert'

const mapStateToProps = state => ({
  values: state.form.insertPromocao && state.form.insertPromocao.values,
  insertPromocaoLoading: getMethodState(state, METHOD).loading,
  insertPromocaoSuccess: getMethodState(state, METHOD).success,
  insertPromocaoError: getMethodState(state, METHOD).error,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit(values) {
    console.log(values)
    const submitValues = {
      ...values,
      restauranteId: ownProps.restauranteId,
    }
    dispatch(call(METHOD, submitValues))
    .then(() => {
      Alert.success('Promoção criada')
      dispatch(reset('insertPromocao'))
    })
    .catch((e) => {
      Alert.error('Algum erro ocorreu')
      console.log(e)
      //  dispatch(reset('insertPromocao'))
    })
  },
})

const PromocaoAdd = connect(
  mapStateToProps,
  mapDispatchToProps
)(PromocoesAddForm)

export default PromocaoAdd
