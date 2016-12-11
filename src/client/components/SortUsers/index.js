import React, { PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'
import MenuItem from 'material-ui/MenuItem'
import {
  SelectField,
} from 'redux-form-material-ui'


class SortForm extends React.Component {
  render() {
    return (
      <div>
        <Field
          name="ordenarPor"
          component={SelectField}
          floatingLabelText="Ordenar Por"
          fullWidth
        >
          <MenuItem value="nome.asc" primaryText="Nome A-Z" />
          <MenuItem value="nome.desc" primaryText="Nome Z-A" />
          {/* <MenuItem value="salario.asc" primaryText="Menor salário" />
          <MenuItem value="salario.desc" primaryText="Maior salário" />
          <MenuItem value="pontos.asc" primaryText="Menor número de pontos" />
          <MenuItem value="pontos.desc" primaryText="Maior número de pontos" />
          <MenuItem value="faltas.asc" primaryText="Menor número de faltas" />
          <MenuItem value="faltas.desc" primaryText="Maior número de faltas" /> */}
        </Field>
      </div>
    )
  }
}

export default reduxForm({
  form: 'sortFuncionarios',
})(SortForm)
