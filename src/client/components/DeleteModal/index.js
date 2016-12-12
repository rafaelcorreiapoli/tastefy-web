import React, {
  Component,
  PropTypes,
} from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Loading from '@components/Loading'
import { connect } from 'react-redux'
import { closeModal, getModalOpen, getEntityId, getMsg } from '@ducks/deleteEntity'

class DeleteModal extends Component {

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

  render() {
    const {
      id,
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
            onTouchTap={() => deleteEntity(entityId, id)}
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
    )
  }
}


const mapDispatchToProps = (dispatch, { id }) => ({
  closeModal() {
    dispatch(closeModal(id))
  },
})

const mapStateToProps = (state, ownProps) => ({
  modalOpen: getModalOpen(state, ownProps.id),
  entityId: getEntityId(state, ownProps.id),
  msg: getMsg(state, ownProps.id),
})
export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal)
