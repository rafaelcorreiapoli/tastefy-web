import React, { PropTypes } from 'react'
import Checkbox from 'material-ui/Checkbox';

class CheckboxInput extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    options: PropTypes.array,
    input: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.handleCheck = this.handleCheck.bind(this)
  }

  handleCheck(checkValue, checked) {
    const {
      input: {
        value,
        onChange,
      },
    } = this.props

    let newValue
    if (checked) {
      if (!Array.isArray(value)) {
        newValue = [checkValue]
      } else {
        newValue = value.concat(checkValue)
      }
    } else {
      if (!Array.isArray(value)) {
        newValue = []
      } else {
        newValue = value.filter(f => f !== checkValue)
      }
    }
    console.log(newValue)

    onChange(newValue)
  }
  render() {
    const {
      label,
      options,
      input: {
        value,
      },
    } = this.props
    return (
      <div>
        <h3>{label}</h3>
        {
        options.map(option => (
          <Checkbox
            key={option.value}
            checked={value.indexOf(option.value) !== -1}
            onCheck={(e, v) => this.handleCheck(option.value, v)}
            label={option.label}
          />
        ))
        }
      </div>
    )
  }
}

export default CheckboxInput;
