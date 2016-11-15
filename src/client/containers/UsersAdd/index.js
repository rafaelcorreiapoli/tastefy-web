import { connect } from 'react-redux'
import UsersAddForm from '@components/UsersAddForm'
import { call, getMethodState } from '@ducks/methods'
import Alert from 'react-s-alert'
import { reset } from 'redux-form'

const METHOD = 'Users.methods.invite'

const mapStateToProps = state => ({
  values: state.form.insertUser && state.form.insertUser.values,
  insertUserLoading: getMethodState(state, METHOD).loading,
  insertUserSuccess: getMethodState(state, METHOD).success,
  insertUserError: getMethodState(state, METHOD).error,
})

const mapDispatchToProps = dispatch => ({
  onSubmit(values) {
    console.log(values)
    dispatch(call(METHOD, values))
    .then(() => {
      Alert.success('Restaurante criado')
      dispatch(reset('insertUser'))
    })
    .catch((e) => {
      Alert.error('Algum erro ocorreu')
      console.log(e)
      //  dispatch(reset('insertUser'))
    })
  },
})

const UsersAdd = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersAddForm)

export default UsersAdd
