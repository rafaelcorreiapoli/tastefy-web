import React, { PropTypes } from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'
import Joi from 'joi-browser'
import { RaisedButton } from 'material-ui'
import InputWrapper from '@components/ReduxFormWidgets/InputWrapper'
import validator from '@utils/validator'
import {
  TextField,
  Checkbox,
} from 'redux-form-material-ui'
import MontarQuestionario from '@components/MontarQuestionario'
import Divider from 'material-ui/Divider'
import PerguntasField from '@components/PerguntasField'

const schema = Joi.object({
  nome: Joi.string().required(),
  tempoMedio: Joi.number().required(),
  ativo: Joi.boolean().required(),
})

const validate = values => validator(values, schema)

class QuestionariosAddForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
  }

  render() {
    const {
      handleSubmit,
      onSubmit,
      invalid,
    } = this.props

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <Field
            floatingLabelText="Nome do Questionário"
            component={TextField}
            name="nome"
            fullWidth
          />
          <Field
            floatingLabelText="Tempo médio (min)"
            component={TextField}
            name="tempoMedio"
            type="number"
            fullWidth
          />
          <Field
            label="Ativo"
            component={Checkbox}
            name="ativo"
            style={{ marginTop: 20, marginBottom: 20 }}
            normalize={v => Boolean(v)}
          />
          <Divider style={{ marginLeft: -20, marginRight: -20, marginTop: 30, marginBottom: 30 }} />
          <h3>Configurar Perguntas</h3>
          <FieldArray
            name="perguntas"
            component={PerguntasField}
          />
        </InputWrapper>
        <InputWrapper>
          <RaisedButton
            label={'Criar'}
            disabled={invalid}
            primary
            type="submit"
          />
        </InputWrapper>
      </form>
    )
  }
}


export default reduxForm({
  form: 'insertQuestionario',
  destroyOnUnmount: false,
  validate,
})(QuestionariosAddForm)
