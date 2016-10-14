import { connect } from 'react-redux'
import FuncionariosAddForm from '@components/FuncionariosAddForm'
import { call, getMethodState } from '@ducks/methods'
import Alert from 'react-s-alert';
import { reset } from 'redux-form';

const METHOD = 'Funcionarios.methods.insert'


const mapStateToProps = state => ({
  values: state.form.novoFuncionario && state.form.novoFuncionario.values,
  novoFuncionarioLoading: getMethodState(state, METHOD).loading,
  novoFuncionarioSuccess: getMethodState(state, METHOD).success,
  novoFuncionarioError: getMethodState(state, METHOD).error,
})

const mapDispatchToProps = dispatch => ({
  onSubmit(values) {
    // Primeiro, criar o usuário
    dispatch(call(METHOD, values))
    .then(() => {
      Alert.success('Funcionário criado');
      dispatch(reset('novoFuncionario'))
    })
    .catch(() => {
      Alert.error('Algum erro ocorreu');
      //  dispatch(reset('novoDepartamento'))
    })
  },
})

const FuncionariosAdd = connect(
  mapStateToProps,
  mapDispatchToProps
)(FuncionariosAddForm)

export default FuncionariosAdd
