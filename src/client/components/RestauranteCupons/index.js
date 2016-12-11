import React, {
  Component,
  PropTypes,
} from 'react'
import CuponsList from '@components/CuponsList'
import QRCode from 'qrcode.react'
import Dialog from 'material-ui/Dialog'

export default class RestauranteCupons extends Component {

  static defaultProps = {}

  static propTypes = {
    cupons: PropTypes.array,
    qrCodeDialogOpen: PropTypes.bool,
    selectedToken: PropTypes.string,
    closeQrCodeDialog: PropTypes.func,
    selectQrCode: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      cupons,
      qrCodeDialogOpen,
      selectedToken,
      closeQrCodeDialog,
      selectQrCode,
    } = this.props

    return (
      <div>
        <Dialog
          title="Dialog With Actions"
          modal={false}
          open={qrCodeDialogOpen}
          onRequestClose={closeQrCodeDialog}
        >
          {
            selectedToken &&
            <QRCode value={selectedToken} size={400} height={400} />
          }
        </Dialog>
        <CuponsList
          cupons={cupons}
          onDelete={questionarioId => console.log('delete!')}
          onEdit={questionarioId => console.log('edit!')}
          onClickQRCode={({ token }) => selectQrCode(token)}
        />
      </div>
    )
  }
}
