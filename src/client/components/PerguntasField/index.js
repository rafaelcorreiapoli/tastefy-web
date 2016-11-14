import React, {
  Component,
  PropTypes,
} from 'react'
import { Field, FieldArray } from 'redux-form'
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
import SelectConfig from '@components/MontarQuestionario/Config/Select'


const styles = {
  divider: {
    marginRight: -20,
    marginLeft: -20,
    marginTop: 30,
    marginBottom: 30,
  },
}
export default class PerguntasField extends Component {

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
      name,
    } = this.props

    return (
      <div>
        <div>
          {
            fields && fields.map((pergunta, perguntaIndex) => (
              <div style={styles.perguntaContainer} key={perguntaIndex}>
                <Panel
                  style={styles.panel}
                  title={`Pergunta #${perguntaIndex + 1}`}
                  toolbar={
                    <IconButton
                      tooltip="Remover Pergunta"
                      onTouchTap={() => fields.remove(perguntaIndex)}
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
                    <Divider style={styles.divider} />
                    <FieldArray
                      name={`${pergunta}.config.options`}
                      component={SelectConfig}
                    />
                  </div>
                </Panel>
              </div>
            ))
          }
        </div>
        <RaisedButton
          onTouchTap={() => fields.push()}
          label="Adicionar Pergunta"
          primary
        />
      </div>
    )
  }

}
