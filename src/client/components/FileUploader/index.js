import React, { PropTypes } from 'react'
import Files, { FileDDP } from '/client/files'
import UploadImageProgress from '@components/UploadImageProgress'

export const STATUS_SUCCESS = 0
export const STATUS_ERROR = 1
export const STATUS_PAUSED = 2
export const STATUS_UPLOADING = 3
export const STATUS_ABORTED = 4
export const STATUS_IDLE = 5;

class FileUploader extends React.Component {
  static propTypes = {
    onStart: PropTypes.func,
    onError: PropTypes.func,
    onSuccess: PropTypes.func,
    onProgress: PropTypes.func,
    onPause: PropTypes.func,
    onAbort: PropTypes.func,
    onContinue: PropTypes.func,
    onRemove: PropTypes.func,
    autoStart: PropTypes.bool,

    preview: PropTypes.string,
    progress: PropTypes.number,
    status: PropTypes.number,

    file: PropTypes.any,
    style: PropTypes.object,

    _id: PropTypes.string,
    uploadConfig: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.state = {
      progress: 0,
      status: STATUS_IDLE,
    }
    this.handleRemove = this.handleRemove.bind(this)
  }

  componentDidMount() {
    this.prepareUpload()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.file !== nextProps.file && this.state.status === STATUS_IDLE) {
      this.prepareUpload()
    }
  }

  start() {
    this.setState({
      progress: 0,
      status: STATUS_UPLOADING,
    }, () => this.upload.start())
  }
  pause() {
    this.upload.pause();
  }
  abort() {
    this.upload.abort();
  }
  continueUpload() {
    this.upload.continue()
  }

  prepareUpload() {
    const {
      onStart,
      onError,
      onSuccess,
      onProgress,
      onPause,
      onAbort,
      onContinue,
      autoStart = true,
      file,
      uploadConfig = {},
    } = this.props

    this.upload = Files.insert({
      file,
      streams: 'dynamic',
      chunkSize: 'dynamic',
      ...uploadConfig,
    }, false);

    this.upload.on('start', (error, fileObj) => {
      console.log('start!')
      // this.pushFile(fileId, fileObj.name, file.preview, upload)
      this.setState({
        status: STATUS_UPLOADING,
      }, () => onStart(fileObj))
    });

    this.upload.on('end', (error, fileObj) => {
      if (error) {
        // this.setFileProperty(fileId, { status: STATUS_ERROR })
        this.setState({
          status: STATUS_ERROR,
        }, () => onError(error))
      } else {
        // this.setFileProperty(fileId, {
        //   _id: fileObj._id,
        //   status: STATUS_SUCCESS,
        // })

        this.setState({
          status: STATUS_SUCCESS,
        }, () => onSuccess(fileObj._id))
      }
    });

    this.upload.on('progress', progress => {
      // this.setFileProperty(fileId, {
      //   progress,
      // })
      this.setState({
        progress,
      }, () => onProgress(progress))
    })

    this.upload.on('pause', () => {
      // this.setFileProperty(fileId, {
      //   status: STATUS_PAUSED,
      // })
      this.setState({
        status: STATUS_PAUSED,
      }, () => onPause())
    })

    this.upload.on('abort', () => {
      // this.setFileProperty(fileId, {
      //   status: STATUS_ABORTED,
      // })
      this.setState({
        status: STATUS_ABORTED,
      }, () => onAbort())
    })

    this.upload.on('continue', () => {
      // this.setFileProperty(fileId, {
      //   status: STATUS_UPLOADING,
      // })
      this.setState({
        status: STATUS_UPLOADING,
      }, () => onContinue())
    })

    this.upload.start()
  }

  handleRemove() {
    const {
      onRemove,
      _id,
    } = this.props

    FileDDP.call('removeFile', _id, (err) => {
      if (!err) {
        onRemove()
      }
    })
  }

  render() {
    const {
      preview,
      style,
    } = this.props

    const {
      progress,
      status,
    } = this.state

    return (
      <UploadImageProgress
        image={preview}
        progress={progress}
        success={status === STATUS_SUCCESS}
        error={status === STATUS_ERROR}
        paused={status === STATUS_PAUSED}
        uploading={status === STATUS_UPLOADING}
        cancelled={status === STATUS_ABORTED}
        style={style}

        onRemove={this.handleRemove}
        // onCancel={() => upload.abort()}
        onPause={() => this.upload.pause()}
        onContinue={() => this.upload.continue()}
        // onTryAgain={() => this.startUpload(upload.file, fileId)}
        // onRemove={() => onRemoveFile(uploaderId, fileId)}
      />
    )
  }
}

export default FileUploader;
