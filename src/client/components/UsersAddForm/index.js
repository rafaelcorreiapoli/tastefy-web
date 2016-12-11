import React, { PropTypes } from 'react'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import Joi from 'joi-browser'
import { RaisedButton, MenuItem } from 'material-ui'
import InputWrapper from '@components/ReduxFormWidgets/InputWrapper'
import validator from '@utils/validator'
import { connect } from 'react-redux'
import { composeWithTracker } from 'react-komposer'
import Restaurantes from '@collections/restaurantes'

import {
  SelectField,
  TextField,
} from 'redux-form-material-ui'

const ROLES_ADMIN = 'admin'
const ROLES_GESTOR = 'gestor'
const ROLES_GARCOM = 'garcom'

const schema = Joi.object({
  email: Joi.string().required(),
  nomeCompleto: Joi.string().required(),
  role: Joi.string().required(),
  restauranteId: Joi.string().when('role', {
    is: ROLES_GESTOR,
    then: Joi.required(),
  }),
  foto: Joi.string().required(),
  password: Joi.string().required(),
})

const validate = values => validator(values, schema)


class UsersAddForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    mostrarRestauranteId: PropTypes.bool,
    optionsRestauranteId: PropTypes.array,
  }

  render() {
    const {
      handleSubmit,
      onSubmit,
      invalid,
      mostrarRestauranteId,
      optionsRestauranteId,
    } = this.props

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <Field
            floatingLabelText="Email"
            component={TextField}
            name="email"
            fullWidth
          />
          <Field
            floatingLabelText="Senha"
            component={TextField}
            type="password"
            name="password"
            fullWidth
          />
          <Field
            floatingLabelText="Nome Completo"
            component={TextField}
            name="nomeCompleto"
            fullWidth
          />
          <Field
            floatingLabelText="Grupo"
            component={SelectField}
            name="role"
            fullWidth
          >
            <MenuItem value={ROLES_ADMIN} primaryText="Administrador" />
            <MenuItem value={ROLES_GESTOR} primaryText="Gestor" />
            <MenuItem value={ROLES_GARCOM} primaryText="Garçom" />
          </Field>
          {
            mostrarRestauranteId &&
            <Field
              floatingLabelText="Restaurante"
              component={SelectField}
              name="restauranteId"
              fullWidth
            >
              {
                optionsRestauranteId && optionsRestauranteId.map(option => (
                  <MenuItem key={option.value} value={option.value} primaryText={option.label} />
                ))
              }
            </Field>
          }
          <Field
            floatingLabelText="Foto"
            component={TextField}
            name="foto"
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

const selector = formValueSelector('insertUser')

const compose = (props, onData) => {
  if (props.mostrarRestauranteId) {
    const handler = Meteor.subscribe('restaurantes.quickList')
    const optionsRestauranteId = Restaurantes.find().map(restaurante => ({
      value: restaurante._id,
      label: restaurante.nome,
    }))

    if (handler.ready()) {
      onData(null, {
        optionsRestauranteId,
      })
    }
  } else {
    onData(null, {

    })
  }
}

const mapStateToProps = (state) => {
  const role = selector(state, 'role')

  const mostrarRestauranteId = role === ROLES_GARCOM || role === ROLES_GESTOR

  return {
    mostrarRestauranteId,
  }
}

export default connect(
  mapStateToProps
)(composeWithTracker(
  compose
)(reduxForm({
  form: 'insertUser',
  destroyOnUnmount: false,
  validate,
})(UsersAddForm)))
