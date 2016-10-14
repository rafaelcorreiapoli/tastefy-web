import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import DrawerContainer from '@containers/DrawerContainer'
import AppBarContainer from '@containers/AppBarContainer';
import { setInsertBotDialogOpen } from '@ducks/layout'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import InsertBotForm from '@components/InsertBotForm'


class AuthenticatedLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    insertBotDialogOpen: PropTypes.bool,
    handleRequestClose: PropTypes.func,
  }
  componentDidMount() {
    //console.log(this.refs.insertBotForm.getWrappedInstance())
  }

  render() {
    const {
      children,
    } = this.props

    return (
      <div>
        <DrawerContainer />
        <AppBarContainer />
        <div style={{ display: 'flex', flexDirection: 'column', margin: 20 }}>
          {children}
        </div>
      </div>
    )
  }
}

export default AuthenticatedLayout
