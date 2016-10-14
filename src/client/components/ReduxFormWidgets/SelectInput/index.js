import React, { PropTypes } from 'react'
import { SelectField, MenuItem } from 'material-ui';

const SelectInput = ({
  label,
  options,
  input: {
    value,
    onChange
  }
}) => {
  return (
    <SelectField
      value={value}
      onChange={(e, index) => onChange(options[index].value)}
      fullWidth={true}
      floatingLabelText={label}
      floatingLabelFixed={true} >
      {
        options.map(option => (
          <MenuItem key={option.value} value={option.value} primaryText={option.label} />
        ))
      }
    </SelectField>
  )
}

export default SelectInput
