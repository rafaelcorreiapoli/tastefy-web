import React, { PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'
import Joi from 'joi-browser'
import { RaisedButton, MenuItem } from 'material-ui'
import InputWrapper from '@components/ReduxFormWidgets/InputWrapper'
import validator from '@utils/validator'
import {
  SelectField,
  TextField,
} from 'redux-form-material-ui'

const schema = Joi.object({
  nome: Joi.string().required(),
  categoria: Joi.string().required(),
  lat: Joi.number().required(),
  lng: Joi.number().required(),
  logoUrl: Joi.string().required(),
  backgroundUrl: Joi.string().required(),
})

const validate = values => validator(values, schema)

const normalizeNumber = (value, previous) => {
  console.log(value.slice(-1))
  if (value.slice(-1) === '.') {
    console.log("reutrning " + value)
    return value
  }

  if (isNaN(Number(value))) {
    return previous
  }

  return Number(value)
}

class RestaurantesAddForm extends React.Component {
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
            floatingLabelText="Nome do Restaurante"
            component={TextField}
            name="nome"
            fullWidth
          />
          <Field
            floatingLabelText="Categoria"
            component={SelectField}
            name="categoria"
            fullWidth
          >
            <MenuItem value="lanches" primaryText="Lanches" />
            <MenuItem value="japones" primaryText="Japonês" />
            <MenuItem value="arabe" primaryText="Árabe" />
          </Field>
          <Field
            floatingLabelText="Latitude"
            component={TextField}
            name="lat"
            fullWidth
            type="number"
          />
          <Field
            floatingLabelText="Longitude"
            component={TextField}
            type="number"
            name="lng"
            fullWidth
          />
          <Field
            floatingLabelText="Logo"
            component={TextField}
            name="logoUrl"
            fullWidth
          />
          <Field
            floatingLabelText="Background"
            component={TextField}
            name="backgroundUrl"
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
  form: 'novoRestaurante',
  destroyOnUnmount: false,
  validate,
})(RestaurantesAddForm)
