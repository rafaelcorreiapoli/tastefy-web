import { connect } from 'react-redux'
import SetoresAddForm from '@components/SetoresAddForm'
import { call, getMethodState } from '@ducks/methods'
import Alert from 'react-s-alert';
import { reset } from 'redux-form';

const METHOD = 'Setores.methods.insert'


const mapStateToProps = state => ({
  values: state.form.novoSetor && state.form.novoSetor.values,
  novoSetorLoading: getMethodState(state, METHOD).loading,
  novoSetorSuccess: getMethodState(state, METHOD).success,
  novoSetorError: getMethodState(state, METHOD).error,
})

const mapDispatchToProps = dispatch => ({
  onSubmit(values) {
    // Primeiro, criar o usuário
    dispatch(call(METHOD, values))
    .then(() => {
      Alert.success('Setor criado');
      dispatch(reset('novoSetor'))
    })
    .catch(() => {
      Alert.error('Algum erro ocorreu');
      //  dispatch(reset('novoDepartamento'))
    })
  },
})

const SetoresAdd = connect(
  mapStateToProps,
  mapDispatchToProps
)(SetoresAddForm)

export default SetoresAdd
