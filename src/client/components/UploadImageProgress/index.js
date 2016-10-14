import React, { PropTypes } from 'react'
import { Play, Pause, Error, Cancel, Remove, Check, Replay} from '@resources/icons'
import { IconButton } from 'material-ui'

const styles = {
  container: {
    position: 'relative',
    display: 'inline-block',
    backgroundColor: '#d3d3d3',
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    top: 0,
    left: 0,
    right: 0,
  },
  staticOverlay: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  progress: {
    position: 'absolute',
    color: 'white',
    fontSize: 32,
    textAlign: 'center',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    textShadow: '2px 2px 2px rgba(150, 150, 150, 1)',
  },
  image: {
    width: '100%',
    height: '100%',
    display: 'block',
  },
  iconButton: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    width: 100,
    height: 100,
  },
  icon: {
    color: 'white',
    width: 50,
    height: 50,
  }
}
class UploadImageProgress extends React.Component {
  static propTypes = {
    image: PropTypes.string,
    progress: PropTypes.number,
    height: PropTypes.number,
    width: PropTypes.number,
    style: PropTypes.object,
    uploading: PropTypes.bool,
    success: PropTypes.bool,
    error: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this)
    this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this)
    this.state = {
      hover: false,
    }
  }
  onMouseEnterHandler() {
    this.setState({
      hover: true,
    })
  }

  onMouseLeaveHandler() {
    this.setState({
      hover: false,
    })
  }

  render() {
    const {
      image,
      progress,
      style,
      paused,
      uploading,
      success,
      error,
      onRemove,
      onTryAgain,
      onCancel,
      onPause,
      onContinue,
    } = this.props

    const {
      hover,
    } = this.state

    const mergedContainerStyle = Object.assign({}, styles.container, style, {
      backgroundImage: image,
    })
    const mergedOverlayStyle = Object.assign({}, styles.overlay, {
      bottom: (progress / 100) * style.height,
    })

    return (
      <div
        style={mergedContainerStyle}
        onMouseEnter={this.onMouseEnterHandler}
        onMouseLeave={this.onMouseLeaveHandler}
      >
        <div style={mergedOverlayStyle} />
        <div style={styles.staticOverlay} />
        <img src={image} style={styles.image} />
        {
          (paused && hover) &&
            <IconButton
              style={styles.iconButton}
              iconStyle={Object.assign({}, styles.icon, { color: 'white' })}
              onTouchTap={onContinue}
            >
              <Play />
            </IconButton>
        }
        {
          (paused && !hover) &&
            <IconButton
              style={styles.iconButton}
              iconStyle={Object.assign({}, styles.icon, { color: 'white' })}
            >
              <Pause />
            </IconButton>
        }
        { // Pause (hovering)
          (uploading && hover) &&
            <IconButton
              style={styles.iconButton}
              iconStyle={Object.assign({}, styles.icon, { color: 'white' })}
              onTouchTap={onPause}
            >
              <Pause />
            </IconButton>
        }
        { // Display progress (not hovering)
          (uploading && !hover) &&
            <span style={styles.progress}>
              {progress}%
            </span>
        }
        { //  Remove after upload (hover)
          (success && hover) &&
            <IconButton
              style={styles.iconButton}
              iconStyle={Object.assign({}, styles.icon, { color: 'white' })}
              onTouchTap={onRemove}
            >
              <Remove />
            </IconButton>
        }
        { //  Success (not hovering)
          (success && !hover) &&
            <IconButton
              style={styles.iconButton}
              iconStyle={Object.assign({}, styles.icon, { color: 'white' })}
            >
              <Check />
            </IconButton>
        }
        { //  Try again (hovering)
          (error && hover) &&
            <IconButton
              style={styles.iconButton}
              iconStyle={Object.assign({}, styles.icon, { color: 'white' })}
              onTouchTap={onTryAgain}
            >
              <Replay />
            </IconButton>
        }
        { //  Error (not hovering)
          (error && !hover) &&
            <IconButton
              style={styles.iconButton}
              iconStyle={Object.assign({}, styles.icon, { color: 'white' })}
            >
              <Error />
            </IconButton>
        }
      </div>
    )
  }
}

export default UploadImageProgress;
