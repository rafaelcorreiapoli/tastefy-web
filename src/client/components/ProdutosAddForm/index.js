import React, { PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'
import Joi from 'joi-browser'
import { RaisedButton } from 'material-ui'
import InputWrapper from '@components/ReduxFormWidgets/InputWrapper'
import validator from '@utils/validator'
import {
  TextField,
} from 'redux-form-material-ui'

const schema = Joi.object({
  nome: Joi.string().required(),
  imagemUrl: Joi.string().required(),
  desconto: Joi.number().required(),
  observacao: Joi.string().required(),
})

const validate = values => validator(values, schema)

class ProdutosAddForm extends React.Component {
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
            floatingLabelText="Nome do Produto"
            component={TextField}
            name="nome"
            fullWidth
          />
          <Field
            floatingLabelText="Imagem"
            component={TextField}
            name="imagemUrl"
            fullWidth
          />
          <Field
            floatingLabelText="Desconto (%)"
            component={TextField}
            name="desconto"
            type="number"
            fullWidth
          />
          <Field
            floatingLabelText="Observação"
            component={TextField}
            name="observacao"
            fullWidth
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
  form: 'insertProduto',
  destroyOnUnmount: false,
  validate,
})(ProdutosAddForm)
