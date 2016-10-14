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
import Dialog from 'material-ui/Dialog';

const schema = Joi.object({
  nome: Joi.string().required(),
  responsavelId: Joi.string().required(),
  parentId: Joi.string().required(),
});

const validate = values => validator(values, schema)


class DepartamentosAddForm extends React.Component {
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
            floatingLabelText="Nome do Departamento"
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
            <MenuItem value={''} primaryText="Nenhum" />
            <MenuItem value="dep1" primaryText="Dep 1" />
            <MenuItem value="dep2" primaryText="Dep 2" />
            <MenuItem value="dep3" primaryText="Dep 3" />
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
  form: 'novoDepartamento',
  destroyOnUnmount: false,
  validate,
})(DepartamentosAddForm)
