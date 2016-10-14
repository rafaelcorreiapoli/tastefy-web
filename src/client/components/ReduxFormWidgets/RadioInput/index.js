import React, { PropTypes } from 'react'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

class RadioInput extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.array,
    input: PropTypes.object,
  }

  render() {
    const {
      label,
      name,
      options,
      input: {
        value,
        onChange,
      },
    } = this.props
    return (
      <div>
        <h3>
          {label}
        </h3>

        <RadioButtonGroup
          name={name}
          onChange={(e, v) => onChange(v)}
          valueSelected={value}
          defaultSelected={options[0].value}
        >
          {
            options.map(option => (
              <RadioButton
                key={option.value}
                value={option.value}
                label={option.label}
              />
            ))
          }
        </RadioButtonGroup>
      </div>

    )
  }
}

export default RadioInput;
