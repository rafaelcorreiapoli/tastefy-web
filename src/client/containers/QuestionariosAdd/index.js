import { connect } from 'react-redux'
import QuestionariosAddForm from '@components/QuestionariosAddForm'
import { call, getMethodState } from '@ducks/methods'
import Alert from 'react-s-alert'
import { reset } from 'redux-form'

const METHOD = 'Questionarios.methods.insert'

const mapStateToProps = state => ({
  values: state.form.insertQuestionario && state.form.insertQuestionario.values,
  insertQuestionarioLoading: getMethodState(state, METHOD).loading,
  insertQuestionarioSuccess: getMethodState(state, METHOD).success,
  insertQuestionarioError: getMethodState(state, METHOD).error,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit(values) {
    console.log(values)
    const questionario = {
      nome: values.nome,
      tempoMedio: Number(values.tempoMedio),
      restauranteId: ownProps.restauranteId,
    }

    const perguntas = values.perguntas
    console.log(questionario, perguntas)
    
    dispatch(call(METHOD, {
      questionario,
      perguntas,
    }))
    .then(() => {
      Alert.success('Questionário criada')
      dispatch(reset('insertQuestionario'))
    })
    .catch((e) => {
      Alert.error('Algum erro ocorreu')
      console.log(e)
      //  dispatch(reset('insertQuestionario'))
    })
  },
})

const QuestionarioAdd = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionariosAddForm)

export default QuestionarioAdd
