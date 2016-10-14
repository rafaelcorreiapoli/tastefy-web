import React, { PropTypes } from 'react'
import Webcam from 'react-webcam'
import RaisedButton from 'material-ui/RaisedButton'
import { Camera } from '@resources/icons'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  fab: {
    width: 100,
    height: 100,
    padding: 5,
  },
  fabIcon: {
    width: 90,
    height: 90
  },
  button: {
    height: 100,
    width: 640,
  },
  counterOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    color: 'white',
    fontSize: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}
class TirarFoto extends React.Component {
  static propTypes = {
    onFotoTirada: PropTypes.func,
    style: PropTypes.object,
  }
  constructor(props) {
    super(props)

    this.tirarFoto = this.tirarFoto.bind(this)
    this.startCounter = this.startCounter.bind(this)
    this.stopCounter = this.stopCounter.bind(this)
    this.state = {
      foto: null,
      count: 3,
      showCounter: false,
    }
  }
  tirarFoto() {
    const {
      onFotoTirada,
    } = this.props

    const foto = this.webcam.getScreenshot()

    this.setState({
      foto,
    })

    onFotoTirada(foto)
  }


  startCounter() {
    this.setState({
      showCounter: true,
    })
    this.interval = setInterval(() => {
      if (this.state.count <= 1) {
        this.tirarFoto()
        this.stopCounter()
        return
      }
      this.setState({
        count: this.state.count - 1,
      })
    }, 1000)
  }

  stopCounter() {
    clearInterval(this.interval)
    this.setState({
      showCounter: false,
      count: 3
    })
  }


  render() {
    const {
      foto,
      count,
      showCounter,
    } = this.state
    const {
      style,
    } = this.props
    return (
      <div style={Object.assign({}, styles.container, style)}>
        <div style={{ position: 'relative', display: 'block' }}>
          {/* { foto ?
            <img src={foto} style={{ width: 640, height: 480, display: 'block' }} />
            : */}
          <Webcam ref={(w) => { this.webcam = w }} className="display-block" />


          <span style={styles.counterOverlay}>
            {showCounter && count}
          </span>
        </div>
        {
          showCounter ?
            <RaisedButton
              primary
              onTouchTap={this.stopCounter}
              style={styles.button}
              label="CANCELAR"
            />
          :
            <RaisedButton
              secondary
              onTouchTap={this.startCounter}
              style={styles.button}
              icon={<Camera style={{ width: 60, height: 60 }} />}
            />
        }

      </div>
    )
  }
}

export default TirarFoto;
