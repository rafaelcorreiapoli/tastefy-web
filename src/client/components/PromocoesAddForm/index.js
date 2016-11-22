import React, { PropTypes } from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'
import Joi from 'joi-browser'
import { RaisedButton, MenuItem } from 'material-ui'
import InputWrapper from '@components/ReduxFormWidgets/InputWrapper'
import validator from '@utils/validator'
import SelecionarProdutoField from '@components/ReduxFormWidgets/SelecionarProdutoField'


import {
  TextField,
  DatePicker,
  Checkbox,
} from 'redux-form-material-ui'

const schema = Joi.object({
  nome: Joi.string().required(),
  validoAte: Joi.object().required(),
  descricao: Joi.string().required(),
  imagemUrl: Joi.string().required(),
  regras: Joi.string().required(),
  ativa: Joi.boolean(),
  produtosId: Joi.array().items(Joi.string()),
})

const validate = values => validator(values, schema)

class PromocoesAddForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    optionsProdutos: PropTypes.array,
  }

  render() {
    const {
      handleSubmit,
      onSubmit,
      invalid,
      optionsProdutos,
    } = this.props

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <Field
            floatingLabelText="Nome da Promoção"
            component={TextField}
            name="nome"
            fullWidth
          />
          <Field
            floatingLabelText="Válida até"
            component={DatePicker}
            name="validoAte"
          />
          <Field
            floatingLabelText="Descrição"
            component={TextField}
            name="descricao"
            fullWidth
          />
          <Field
            floatingLabelText="Regras"
            component={TextField}
            name="regras"
            fullWidth
          />
          <Field
            floatingLabelText="Imagem"
            component={TextField}
            name="imagemUrl"
            fullWidth
          />
          <Field
            label="Ativa"
            component={Checkbox}
            name="ativa"
            style={{ marginTop: 20, marginBottom: 20 }}
            normalize={v => Boolean(v)}
          />
          <Field
            component={SelecionarProdutoField}
            name="produtosId"
            produtos={optionsProdutos}
          />
          {/* <SelecionarProdutoField
            value={['a', 'b']}
            produtos={optionsProdutos}
          /> */}
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
  form: 'insertPromocao',
  destroyOnUnmount: false,
  validate,
})(PromocoesAddForm)
