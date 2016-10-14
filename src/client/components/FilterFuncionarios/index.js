import React, { PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'
import MenuItem from 'material-ui/MenuItem'
import { RadioButton } from 'material-ui/RadioButton'
import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  TextField,
  Toggle,
} from 'redux-form-material-ui'
import Slider from 'rc-slider'

class FilterFuncionarios extends React.Component {
  render() {
    return (
      <div>
        <h4>Salário</h4>
        <Slider
          range
          value={[10, 20]}
          min={0}
          max={100}
          onChange={e => console.log(e)}
        />
        <Field
          name="departamento"
          component={SelectField}
          floatingLabelText="Departamento"
          fullWidth
        />

        <Field
          name="setor"
          component={SelectField}
          floatingLabelText="Setor"
          fullWidth
        />
      </div>
    )
  }
}

export default reduxForm({
  form: 'filterFuncionarios',
})(FilterFuncionarios)
