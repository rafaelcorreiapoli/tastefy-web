import { connect } from 'react-redux'
import DepartamentosAddForm from '@components/DepartamentosAddForm'
import { call, getMethodState } from '@ducks/methods'
import Alert from 'react-s-alert';
import { reset } from 'redux-form';

const METHOD = 'Departamentos.methods.insert'

const mapStateToProps = state => ({
  values: state.form.novoDepartamento && state.form.novoDepartamento.values,
  novoDepartamentoLoading: getMethodState(state, METHOD).loading,
  novoDepartamentoSuccess: getMethodState(state, METHOD).success,
  novoDepartamentoError: getMethodState(state, METHOD).error,
})

const mapDispatchToProps = dispatch => ({
  onSubmit(values) {
    dispatch(call(METHOD, values))
    .then(() => {
      Alert.success('Departamento criado');
      dispatch(reset('novoDepartamento'))
    })
    .catch(() => {
      Alert.error('Algum erro ocorreu');
      //  dispatch(reset('novoDepartamento'))
    })
  },
})

const DepartamentosAdd = connect(
  mapStateToProps,
  mapDispatchToProps
)(DepartamentosAddForm)

export default DepartamentosAdd
