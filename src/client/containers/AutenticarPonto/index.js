import React, { PropTypes } from 'react'
import Dialog from 'material-ui/Dialog'
import { connect } from 'react-redux'
import { setFoto, iniciarUpload, cancel } from '@ducks/autenticarPonto'
import FlatButton from 'material-ui/FlatButton'
import TirarFoto from '@components/TirarFoto'
import MDSpinner from 'react-md-spinner';
import { Check, Close } from '@resources/icons'

const styles = {
  sucesso: {
    color: 'green',
  },
  erro: {
    color: 'red',
  },
}
class AutenticarPonto extends React.Component {
  static propTypes = {
    handleFotoTirada: PropTypes.func,
    handleCancel: PropTypes.func,
    foto: PropTypes.string,
    autenticando: PropTypes.bool,
    uploading: PropTypes.bool,
    sucesso: PropTypes.bool,
    erro: PropTypes.bool,
  }

  render() {
    const {
      handleFotoTirada,
      foto,
      autenticando,
      uploading,
      handleCancel,
      sucesso,
      erro,
    } = this.props
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={handleCancel}
      />,
    ];

    return (
      <div>
        <TirarFoto
          onFotoTirada={handleFotoTirada}
        />
        <Dialog
          title="Autenticando..."
          actions={actions}
          open={!!foto}
          modal
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <img src={foto} style={{ display: 'block' }} />
            <h3>
              {uploading && 'Enviando...'}
              {autenticando && 'Autenticando...'}
              {sucesso && <span style={styles.sucesso}>Sucesso</span>}
              {erro && <span style={styles.erro}>Erro!</span>}
            </h3>
            {(autenticando || uploading) && <MDSpinner />}
            {sucesso && <Check color="green" /> }
            {erro && <Close color="red" /> }
          </div>

        </Dialog>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  autenticando: state.autenticarPonto.get('autenticando'),
  uploading: state.autenticarPonto.get('uploading'),
  sucesso: state.autenticarPonto.get('sucesso'),
  erro: state.autenticarPonto.get('erro'),
  foto: state.autenticarPonto.get('foto'),
})

const mapDispatchToProps = (dispatch) => ({
  handleFotoTirada(foto) {
    dispatch(setFoto(foto))
    dispatch(iniciarUpload())
  },
  handleCancel() {
    dispatch(cancel())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AutenticarPonto);
