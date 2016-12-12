import React, {
  Component,
  PropTypes,
} from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Loading from '@components/Loading'

export default class DeleteEntity extends Component {

  static defaultProps = {}

  static propTypes = {
    modalOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    deleteEntity: PropTypes.func,
    entityId: PropTypes.string,
    msg: PropTypes.string,
    success: PropTypes.bool,
    loading: PropTypes.bool,
    error: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  _renderView() {
    const {
      renderView,
      askToDelete,
    } = this.props

    return renderView(askToDelete)
  }
  render() {
    const {
      modalOpen,
      closeModal,
      deleteEntity,
      entityId,
      msg,
      success,
      loading,
      error,
    } = this.props

    return (
      <div>
        <Dialog
          open={modalOpen}
          onRequestClose={closeModal}
          modal={false}
          actions={[
            <FlatButton
              label="Cancel"
              keyboardFocused
              primary
              onTouchTap={closeModal}
            />,
            <FlatButton
              label="Confirmar"
              primary
              onTouchTap={() => deleteEntity(entityId)}
            />,
          ]}
        >
          {
            loading ?
              <Loading />
            :
              <span>{msg}</span>
          }
        </Dialog>
        {this._renderView()}
      </div>
    )
  }

}
