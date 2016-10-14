import React, { PropTypes } from 'react'
import Dropzone from 'react-dropzone'
import Files from '/client/files'
import { connect } from 'react-redux'
import UploadImageProgress from '@components/UploadImageProgress'
import { Random } from 'meteor/random'
import {
  pushFile,
  cancelUpload,
  setProgress,
  setStatus,
  removeFile,
  selectFilesFromUploader,
  setId,
  STATUS_ERROR,
  STATUS_UPLOADING,
  STATUS_ABORTED,
  STATUS_SUCCESS,
  STATUS_PAUSED,
} from '@ducks/uploader'


const uploads = {}

const mapStateToProps = (state, ownProps) => ({
  files: selectFilesFromUploader(state, ownProps.uploaderId),
})

const mapDispatchToProps = dispatch => ({
  onPushFile(uploaderId, fileId, name, preview) {
    dispatch(pushFile(uploaderId, fileId, name, preview))
  },
  onCancelUpload(uploaderId, fileId) {
    dispatch(cancelUpload(uploaderId, fileId))
  },
  onRemoveFile(uploaderId, fileId) {
    dispatch(removeFile(uploaderId, fileId))
  },
  onSetProgress(uploaderId, fileId, progress) {
    dispatch(setProgress(uploaderId, fileId, progress))
  },
  onSetStatus(uploaderId, fileId, status) {
    dispatch(setStatus(uploaderId, fileId, status))
  },
  onSetId(uploaderId, fileId, _id) {
    dispatch(setId(uploaderId, fileId, _id))
  }
})

class Upload extends React.Component {
  static propTypes = {
    uploaderId: PropTypes.string,
    onPushFile: PropTypes.func,
    onSetProgress: PropTypes.func,
    onCancelUpload: PropTypes.func,
    onRemoveFile: PropTypes.func,
    onSetStatus: PropTypes.func,
    files: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.onDrop = this.onDrop.bind(this)
    this.startUpload = this.startUpload.bind(this)
  }

  onDrop(files) {
    files.forEach(file => {
      this.startUpload(file)
    })
  }

  startUpload(file, forceKey) {
    const {
      uploaderId,
      onPushFile,
      onSetProgress,
      onSetStatus,
      onSetId,
    } = this.props

    const upload = Files.insert({
      file,
      streams: 'dynamic',
      chunkSize: 'dynamic',
    }, false);
    const fileId = forceKey ? forceKey : Random.id()

    upload.on('start', (error, fileObj) => {
      uploads[fileId] = upload
      onPushFile(uploaderId, fileId, fileObj.name, file.preview)
    });

    upload.on('end', (error, fileObj) => {
      if (error) {
        onSetStatus(uploaderId, fileId, STATUS_ERROR)
      } else {
        console.log(fileObj)
        onSetId(uploaderId, fileId, fileObj._id)
        onSetStatus(uploaderId, fileId, STATUS_SUCCESS)
      }
    });

    upload.on('progress', progress => {
      onSetProgress(uploaderId, fileId, progress)
    })

    upload.on('pause', () => {
      onSetStatus(uploaderId, fileId, STATUS_PAUSED)
    })

    upload.on('abort', () => {
      onSetStatus(uploaderId, fileId, STATUS_ABORTED)
    })

    upload.on('continue', () => {
      onSetStatus(uploaderId, fileId, STATUS_UPLOADING)
    })

    upload.start();
  }

  render() {
    const {
      uploaderId,
      files,
      onRemoveFile,
     } = this.props

    return (
      <div>
        <Dropzone onDrop={this.onDrop}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
        <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
          {
            files.entrySeq().map(([key, file]) => (
              <UploadImageProgress
                key={key}
                image={file.get('preview')}
                progress={file.get('progress')}
                success={file.get('status') === STATUS_SUCCESS}
                error={file.get('status') === STATUS_ERROR}
                paused={file.get('status') === STATUS_PAUSED}
                uploading={file.get('status') === STATUS_UPLOADING}
                cancelled={file.get('status') === STATUS_ABORTED}
                style={{ width: 200, height: 200 }}
                onCancel={() => uploads[key].abort()}
                onPause={() => uploads[key].pause()}
                onContinue={() => uploads[key].continue()}
                onTryAgain={() => {
                  this.startUpload(uploads[key].file, key)
                }}
                onRemove={() => onRemoveFile(uploaderId, key)}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Upload)
