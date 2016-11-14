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
    prefix: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      prefix,
    } = this.props
    return (
      <div>
        <FieldArray
          name="options"
          component={options => (
            <div>
              <div style={styles.optionsContainer}>
                {
                  options && options.fields.map((option, optionIndex) => (
                    <div key={optionIndex} style={styles.optionContainer}>
                      <span style={{ color: '#d3d3d3', marginRight: 20 }}>
                        #{optionIndex + 1}.
                      </span>
                      <Field
                        name={`${prefix}.${option}.value`}
                        component={TextField}
                        hintText="Value"
                        style={{ marginRight: 20 }}
                      />
                      <Field
                        name={`${prefix}.${option}.label`}
                        component={TextField}
                        hintText="Label"
                        style={{ marginRight: 20 }}
                        fullWidth
                      />
                      <IconButton
                        tooltip="Remover opção"
                        onTouchTap={() => options.fields.remove(optionIndex)}
                      >
                        <Remove />
                      </IconButton>
                    </div>
                  ))
                }
              </div>
              <FlatButton
                onTouchTap={() => options.fields.push()}
                label="Adicionar Opção"
                primary
              />
            </div>
          )}
        />
      </div>
    )
  }

}
