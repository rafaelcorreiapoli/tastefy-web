import React, {
  Component,
  PropTypes,
} from 'react'
import GenericTable from '@components/GenericTable'
import QRCode from 'qrcode.react'
import moment from 'moment'
import { Check, Close } from '@resources/icons'
import FlatButton from 'material-ui/FlatButton'

export default class CuponsList extends Component {

  static defaultProps = {}

  static propTypes = {
    cupons: PropTypes.array,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    onClickQRCode: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      cupons,
      onDelete,
      onEdit,
      onClickQRCode,
    } = this.props

    return (
      <div>
        <GenericTable
          data={cupons}
          headers={[
            'Token',
            'Gerado Em',
            'Gerado Por',
            'Utilizado',
            'Ações',
          ]}
          getRowData={cupom => ([
            <FlatButton
              onTouchTap={() => onClickQRCode(cupom)}
            >
              <QRCode
                value={cupom.token}
                size={36}
                height={36}
              />
            </FlatButton>,
            moment(cupom.geradoEm).format('DD/MM/YYYY HH:mm:ss'),
            cupom.geradoPor,
            cupom.utilizado ? <Check /> : <Close />,
          ])}
          renderActions
          onDelete={id => onDelete(id)}
          onEdit={id => onEdit(id)}
        />
      </div>

    )
  }

}
