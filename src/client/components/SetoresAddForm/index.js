import React, { PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'
import Joi from 'joi-browser';
import { RaisedButton, MenuItem } from 'material-ui';
import InputWrapper from '@components/ReduxFormWidgets/InputWrapper';
import validator from '@utils/validator'
import {
  SelectField,
  TextField,
} from 'redux-form-material-ui'

const schema = Joi.object({
  nome: Joi.string().required(),
  responsavelId: Joi.string().required(),
  parentId: Joi.string().required(),
  departamentoId: Joi.string().required(),
});

const validate = values => validator(values, schema)


class SetoresAddForm extends React.Component {
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
            floatingLabelText="Nome do Setor"
            component={TextField}
            name="nome"
            fullWidth
          />
          <Field
            floatingLabelText="Responsável"
            component={SelectField}
            name="responsavelId"
            fullWidth
          >
            <MenuItem value="funcionario1" primaryText="Funcionario 1" />
            <MenuItem value="funcionario2" primaryText="Funcionario 2" />
            <MenuItem value="funcionario3" primaryText="Funcionario 3" />
          </Field>
          <Field
            floatingLabelText="Pai"
            component={SelectField}
            name="parentId"
            fullWidth
          >
            <MenuItem value="" primaryText="Nenhum" />
            <MenuItem value="setor1" primaryText="Setor 1" />
            <MenuItem value="setor2" primaryText="Setor 2" />
            <MenuItem value="setor3" primaryText="Setor 3" />
          </Field>
          <Field
            floatingLabelText="Departamento"
            component={SelectField}
            name="departamentoId"
            fullWidth
          >
            <MenuItem value="departamento1" primaryText="Departamento 1" />
            <MenuItem value="departamento2" primaryText="Departamento 2" />
            <MenuItem value="departamento3" primaryText="Departamento 3" />
          </Field>
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
  form: 'novoSetor',
  destroyOnUnmount: false,
  validate,
})(SetoresAddForm)
