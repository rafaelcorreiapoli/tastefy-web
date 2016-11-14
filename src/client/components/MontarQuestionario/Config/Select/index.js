import React, {
  Component,
  PropTypes,
} from 'react'
import { Field, FieldArray } from 'redux-form'
import {
  TextField,
} from 'redux-form-material-ui'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import {
  Remove,
} from '@resources/icons'

const styles = {
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10,
  },
  optionContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
}
export default class SelectConfig extends Component {

  static defaultProps = {}

  static propTypes = {
    fields: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      fields,
    } = this.props
    return (
      <div>
        <div style={styles.optionsContainer}>
          {
            fields.map((option, optionIndex) => (
              <div key={optionIndex} style={styles.optionContainer}>
                <span style={{ color: '#d3d3d3', marginRight: 20 }}>
                  #{optionIndex + 1}.
                </span>
                <Field
                  name={`${option}.value`}
                  component={TextField}
                  hintText="Value"
                  style={{ marginRight: 20 }}
                />
                <Field
                  name={`${option}.label`}
                  component={TextField}
                  hintText="Label"
                  style={{ marginRight: 20 }}
                  fullWidth
                />
                <IconButton
                  tooltip="Remover opção"
                  onTouchTap={() => fields.remove(optionIndex)}
                >
                  <Remove />
                </IconButton>
              </div>
            ))
          }
        </div>
        <FlatButton
          onTouchTap={() => fields.push()}
          label="Adicionar Opção"
          primary
        />
      </div>
    )
  }

}
