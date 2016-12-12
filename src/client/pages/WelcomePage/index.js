import React, { PropTypes } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { Meteor } from 'meteor/meteor'
import { composeWithTracker } from 'react-komposer'
import DeleteEntity from '@containers/DeleteEntity'
import RaisedButton from 'material-ui/RaisedButton'
import deleteEntityHoc from '@hocs/deleteEntity'

class WelcomePage extends React.Component {
  static propTypes = {
    nomeCompleto: PropTypes.string,
    askToDelete: PropTypes.func,
  }

  render() {
    const {
      nomeCompleto,
    } = this.props

    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <DeleteEntity
              entityId={'abc'}
              msg={'Tem certeza que deseja deletar?'}
              method={'Método'}
              getErrorMsg={e => `Erro ${e.toString()}`}
              getSuccessMsg={res => 'Success!'}
              getParams={(_id) => {
                debugger
                console.log(_id)
                return { _id }
              }}
              renderView={askToDelete => (
                <RaisedButton
                  label={'Deletar'}
                  primary
                  onTouchTap={askToDelete}
                />
              )}
            />
            <h1>Bem-vindo, {nomeCompleto}</h1>
          </Col>
        </Row>
      </Grid>
    )
  }
}

const compose = (props, onData) => {
  const user = Meteor.user()
  if (user) {
    onData(null, {
      nomeCompleto: user.profile && user.profile.nomeCompleto,
    })
  }
}
export default composeWithTracker(compose)(WelcomePage)
