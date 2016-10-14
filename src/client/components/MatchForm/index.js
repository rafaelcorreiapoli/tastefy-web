import React, { PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import Joi from 'joi-browser';
import InputWrapper from '@components/ReduxFormWidgets/InputWrapper';
import TextInput from '@components/ReduxFormWidgets/TextInput';
import RadioInput from '@components/ReduxFormWidgets/RadioInput'
import CheckboxInput from '@components/ReduxFormWidgets/CheckboxInput'
import MatchFound from '@components/MatchFound'
import { RaisedButton, Paper, FlatButton, Dialog } from 'material-ui';
import validator from '@utils/validator'
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index'
import { setDialogState, newSearch, setMatchFound } from '@ducks/match'
import MDSpinner from 'react-md-spinner'
import { getMethodState } from '@ducks/methods'
import { composeWithTracker } from 'react-komposer'
const styles = {
  subContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    display: 'flex',
  },
}
const schema = Joi.object({
  objetivo: Joi.string().required().label('Objetivo'),
  categoria: Joi.string().required().label('Categoria'),
  nomeCliente: Joi.string().required().label('Nome do Cliente'),
  segmentoAtuacao: Joi.string().required().label('Segmento de atuação'),
  subcategoria: Joi.string().required().label('Subcategoria'),
});

const validate = values => validator(values, schema)

const OPTIONS = [{
  value: 'manhã',
  label: 'Manhã (7:00 às 12:00)',
}, {
  value: 'tarde',
  label: 'Tarde (12:00 às 17:00)',
}, {
  value: 'noite',
  label: 'Noite (17:00 às 23:00)',
}, {
  value: 'madrugada',
  label: 'Madrugada (23:00 em diante)',
}, {
  value: 'qualquer',
  label: 'Qualquer horário',
}]

const OPTIONS_LANE = [{
  value: 'mid',
  label: 'Mid',
}, {
  value: 'top',
  label: 'Top',
}, {
  value: 'jungle',
  label: 'Jungle',
}, {
  value: 'ad-carry',
  label: 'Ad Carry',
}, {
  value: 'suporte',
  label: 'Suporte',
}]

const OPTIONS_ELO = [{
  value: 'bronze',
  label: 'Bronze V até Bronze I',
}, {
  value: 'prata',
  label: 'Prata V até Prata I',
}, {
  value: 'ouro',
  label: 'Ouro V até Ouro I',
}, {
  value: 'platina',
  label: 'Platina V até Platina I',
}, {
  value: 'diamante',
  label: 'Diamante V até Diamante I',
}, {
  value: 'mestre',
  label: 'Mestre',
}, {
  value: 'challenger',
  label: 'Challenger',
}]

/*
Skype [ ]
Curse Voice [ ]
Team Speak 2 [ ]
Team Speak 3 [ ]
Prefiro jogar sem comunicação [ ]
*/
const OPTIONS_COMUNICACAO = [{
  value: 'skype',
  label: 'Skype',
}, {
  value: 'curse-voice',
  label: 'Curse Voice',
}, {
  value: 'team-speak-2',
  label: 'Team Speak 2',
}, {
  value: 'team-speak-3',
  label: 'Team Speak 3',
}, {
  value: 'sem-comunicacao',
  label: 'Prefiro jogar sem comunicação',
}, {
  value: 'tanto-faz',
  label: 'Tanto faz',
}]

class MatchForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    onSubmit: PropTypes.func,
    invalid: PropTypes.bool,
  }
  render() {
    const {
      handleSubmit,
      onSubmit,
      invalid,
      dialogOpen,
      closeDialog,
      startSearch,
      loading,
      matchFound,
      myPicture
    } = this.props

    const actions = [
      <FlatButton
        label={loading ? 'Cancel' : 'Fechar'}
        primary
        onTouchTap={closeDialog}
      />,
    ];

    return (
      <Paper style={{ padding: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Field
                label="EMAIL"
                component={TextInput}
                name="email"
              />
              <Field
                label="NICK"
                component={TextInput}
                name="nick"
              />
            </div>
            <div style={{ display: 'flex' }}>
              <div style={styles.subContainer} >
                <Field
                  label="LANE QUE JOGA"
                  component={RadioInput}
                  options={OPTIONS_LANE}
                  name="lane"
                />
                <Field
                  label="ELO"
                  component={RadioInput}
                  options={OPTIONS_ELO}
                  name="elo"
                />
              </div>
              <div style={styles.subContainer} >
                <Field
                  label="HORÁRIOS DISPONÍVEIS"
                  component={CheckboxInput}
                  options={OPTIONS}
                  name="horario"
                />
                <Field
                  label="COMUNICAÇÃO"
                  component={RadioInput}
                  options={OPTIONS_COMUNICACAO}
                  name="comunicacao"
                />
              </div>
              <div style={styles.subContainer} >
                <Field
                  label="PREFERÊNCIA POR DUPLA"
                  component={RadioInput}
                  options={OPTIONS_LANE}
                  name="laneDupla"
                />
              </div>
            </div>
            <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', padding: 50 }}>
              <RaisedButton
                type="submit"
                primary
                style={{ height: 60, width: 200 }}
                labelStyle={{ fontSize: 30 }}
                label="MATCH!"
              />
            </div>
          </form>

        </div>
        <Dialog
          title={loading ? 'Procurando Jogador...' : 'Jogador encontrado'}
          actions={actions}
          modal={false}
          open={dialogOpen}
          onRequestClose={closeDialog}
        >
          <div style={{ padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {loading && <MDSpinner /> }
            {matchFound && <MatchFound {...matchFound} myPicture={myPicture} duoPicture='https://scontent-gru2-1.xx.fbcdn.net/v/t1.0-1/p160x160/12439046_910658915713435_3162177043611498786_n.jpg?oh=c9322082240d354e5c6326c19f4dd928&oe=58800565' /> }
          </div>
        </Dialog>
      </Paper>

    )
  }
}

const mapStateToProps = state => ({
  dialogOpen: state.match.dialogOpen,
  matchFound: state.match.matchFound,
  loading: getMethodState(state, 'search').loading
})


const mapDispatchToProps = (dispatch) => ({
  closeDialog() {
    dispatch(setDialogState(false))
  },
  onSubmit(values, v) {
    console.log(values, v)
    dispatch(setDialogState(true))
    dispatch(setMatchFound(null))
    dispatch(newSearch({}))
  },
})

const composer = (props, onData) => {
  const user = Meteor.user()
  onData(null, {
    myPicture: user && user.services && user.services.facebook && `http://graph.facebook.com/${user.services.facebook.id}/picture?type=square`,
  })
}

const Form = reduxForm({
  form: 'matchForm',
  validate,
})(MatchForm)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(composeWithTracker(composer)(Form))
