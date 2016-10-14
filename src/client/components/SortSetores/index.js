import React, { PropTypes } from 'react'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'


class SortSetores extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
  }
  render() {
    const {
      value,
      onChange,
    } = this.props

    return (
      <div>
        <SelectField value={value} onChange={(e, i, v) => onChange(v)}>
          <MenuItem value="nome.asc" primaryText="Nome A-Z" />
          <MenuItem value="nome.desc" primaryText="Nome Z-A" />
          <MenuItem value="funcionariosCount.asc" primaryText="Mais funcionários" />
          <MenuItem value="funcionariosCount.desc" primaryText="Menos funcionários" />
        </SelectField>
      </div>
    )
  }
}

export default SortSetores
