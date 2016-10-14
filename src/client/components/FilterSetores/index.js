import React, { PropTypes } from 'react'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'


class FilterSetores extends React.Component {
  static propTypes = {
    value: PropTypes.shape({
      departamentoId: PropTypes.string,
    }),
    onChange: PropTypes.func,
  }
  handleChange(key, value) {
    const {
      onChange,
    } = this.props

    onChange({
      [key]: value,
    })
  }


  render() {
    const {
      value: {
        departamentoId,
      },
    } = this.props

    return (
      <div>
        <SelectField value={departamentoId} onChange={(e, i, v) => this.handleChange('departamentoId', v)}>
          <MenuItem value="departamento1" primaryText="Departamento 1" />
        </SelectField>
      </div>
    )
  }
}

export default FilterSetores
