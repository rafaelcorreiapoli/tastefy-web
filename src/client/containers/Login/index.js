import { connect } from 'react-redux'
import {
  setLoginEmail,
  setLoginPassword,
  loginWithPassword,
  loginWithFacebook,
  loginWithLinkedin,
} from '@ducks/login'
import LoginForm from '@components/LoginForm'
import { push } from 'react-router-redux'


const mapStateToProps = (state, ownProps) => ({
  email: state.login.get('email'),
  password: state.login.get('password'),
  success: state.login.get('success'),
  error: state.login.get('error'),
  loading: state.login.get('loading'),
})

const mapDispatchToProps = (dispatch, ownProps = {}) => ({
  onChangeEmail(email) {
    dispatch(setLoginEmail(email))
  },
  onChangePassword(password) {
    dispatch(setLoginPassword(password))
  },
  onLoginWithPassword(email, password) {
    dispatch(loginWithPassword(email, password))
      .then(() => {
        const { redirect = '/' } = ownProps
        dispatch(push(redirect))
      })
  },
    // onLoginWithFacebook() {
    //   dispatch(loginWithFacebook())
    //   .then(() => {
    //     const { redirect = '/' } = ownProps
    //     dispatch(push(redirect))
    //   })
    // },
    // onLoginWithLinkedin() {
    //   dispatch(loginWithLinkedin())
    //   .then(() => {
    //     const { redirect = '/' } = ownProps
    //     dispatch(push(redirect))
    //   })
    // },
  // onRecoverPassword() {
  //   dispatch(push('/recuperar-senha'))
  // },
})

const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)

export default Login
