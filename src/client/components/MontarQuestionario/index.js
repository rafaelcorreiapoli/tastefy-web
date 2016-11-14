import React, { PropTypes } from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'
import {
  SelectField,
  TextField,
} from 'redux-form-material-ui'
import { Remove } from '@resources/icons'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import Panel from '@components/Panel'
import Divider from 'material-ui/Divider'
import SelectConfig from './Config/Select'

const styles = {
  perguntaContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  panel: {
    flexGrow: 1,
  },
  removeContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
}
class MontarQuestionario extends React.Component {
  static defaultProps = {}

  static propTypes = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <FieldArray
          name="perguntas"
          component={perguntas => (
            <div>
              <div>
                {
                  perguntas.fields && perguntas.fields.map((pergunta, perguntaIndex) => (
                    <div style={styles.perguntaContainer} key={perguntaIndex}>
                      <Panel
                        style={styles.panel}
                        title={`Pergunta #${perguntaIndex + 1}`}
                        toolbar={
                          <IconButton
                            tooltip="Remover Pergunta"
                            onTouchTap={() => perguntas.fields.remove(perguntaIndex)}
                          >
                            <Remove />
                          </IconButton>
                        }
                      >
                        <div style={styles.inputContainer}>
                          <Field
                            name={`${pergunta}.titulo`}
                            floatingLabelText="Título"
                            component={TextField}
                            fullWidth
                          />
                          <Field
                            name={`${pergunta}.tipo`}
                            component={SelectField}
                            hintText="Tipo da resposta"
                            fullWidth
                          >
                            <MenuItem value="array" primaryText="Array" />
                            <MenuItem value="number" primaryText="Number" />
                            <MenuItem value="string" primaryText="String" />
                            <MenuItem value="date" primaryText="Date" />
                          </Field>
                          <Field
                            name={`${pergunta}.widget`}
                            component={SelectField}
                            hintText="Widget"
                            fullWidth
                          >
                            <MenuItem value="text" primaryText="Text" />
                            <MenuItem value="checkbox" primaryText="Checkbox" />
                            <MenuItem value="select" primaryText="Select" />
                            <MenuItem value="rating" primaryText="Rating" />
                            <MenuItem value="slider" primaryText="Slider" />
                            <MenuItem value="imageSelect" primaryText="Image Select" />
                          </Field>
                          <Divider style={{ marginRight: -20, marginLeft: -20, marginTop: 30, marginBottom: 30 }}/>
                          <SelectConfig
                            prefix={pergunta}
                          />
                        </div>
                      </Panel>
                    </div>
                  ))
                }
              </div>
              <RaisedButton
                onTouchTap={() => perguntas.fields.push()}
                label="Adicionar Pergunta"
                primary
              />
            </div>
            )
          }
        />
      </div>
    )
  }
}


export default reduxForm({
  form: 'montarQuestionario',
  destroyOnUnmount: false,
})(MontarQuestionario)
