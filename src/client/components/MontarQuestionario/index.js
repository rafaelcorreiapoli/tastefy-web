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
import PerguntasField from '@components/PerguntasField'

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
          component={PerguntasField}
        />
      </div>
    )
  }
}


export default reduxForm({
  form: 'montarQuestionario',
  destroyOnUnmount: false,
})(MontarQuestionario)
