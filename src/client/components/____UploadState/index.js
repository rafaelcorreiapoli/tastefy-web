import React, { PropTypes } from 'react'
import Dropzone from 'react-dropzone'
import Files from '/client/files'
import UploadImageProgress from '@components/UploadImageProgress'
import { Random } from 'meteor/random'
import {
  STATUS_ERROR,
  STATUS_UPLOADING,
  STATUS_ABORTED,
  STATUS_SUCCESS,
  STATUS_PAUSED,
} from '@ducks/uploader'


class Upload extends React.Component {
  static propTypes = {

  }

  constructor(props) {
    super(props)

    this.onDrop = this.onDrop.bind(this)
    this.startUpload = this.startUpload.bind(this)
    this.pushFile = this.pushFile.bind(this)
    this.setFileProperty = this.setFileProperty.bind(this)
    this.state = {
      files: {},
    }
  }

  onDrop(files) {
    files.forEach(file => {
      this.startUpload(file)
    })
  }

  setFileProperty(fileId, merge) {
    this.setState({
      files: {
        ...this.state.files,
        [fileId]: {
          ...this.state.files[fileId],
          ...merge,
        },
      },
    })
  }

  pushFile(fileId, name, preview, upload) {
    const newFile = {
      progress: 0,
      status: STATUS_UPLOADING,
      name,
      preview,
      upload,
    }
    this.setState(currentState => ({
      files: {
        ...currentState.files,
        [fileId]: newFile,
      },
    }))
  }

  startUpload(file, forceKey) {
    const {
      input: {
        onChange,
        value,
      }
    } = this.props

    const upload = Files.insert({
      file,
      streams: 'dynamic',
      chunkSize: 'dynamic',
    }, false);
    const fileId = forceKey ? forceKey : Random.id()

    upload.on('start', (error, fileObj) => {
      this.pushFile(fileId, fileObj.name, file.preview, upload)
    });

    upload.on('end', (error, fileObj) => {
      if (error) {
        this.setFileProperty(fileId, { status: STATUS_ERROR })
      } else {
        this.setFileProperty(fileId, {
          _id: fileObj._id,
          status: STATUS_SUCCESS,
        })

        //push(fileObj._id)
        let newValues
        console.log(value)
        
        if (Array.isArray(value)) {
          newValues = [
            ...value,
            fileObj._id
          ]
        } else {
          newValues = [fileObj._id]
        }
        console.log(newValues)
        onChange(newValues)
      }
    });

    upload.on('progress', progress => {
      this.setFileProperty(fileId, {
        progress,
      })
    })

    upload.on('pause', () => {
      this.setFileProperty(fileId, {
        status: STATUS_PAUSED,
      })
    })

    upload.on('abort', () => {
      this.setFileProperty(fileId, {
        status: STATUS_ABORTED,
      })
    })

    upload.on('continue', () => {
      this.setFileProperty(fileId, {
        status: STATUS_UPLOADING,
      })
    })

    upload.start();
  }

  render() {
    const {
      files,
    } = this.state
    const {
      input: {
        onChange,
        values,
      }
    } = this.props

    return (
      <div>
        <Dropzone onDrop={this.onDrop}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
        <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
          {
            Object.keys(files).map(fileId => {
              const file = files[fileId]
              return (
                <UploadImageProgress
                  key={fileId}
                  image={file.preview}
                  progress={file.progress}
                  success={file.status === STATUS_SUCCESS}
                  error={file.status === STATUS_ERROR}
                  paused={file.status === STATUS_PAUSED}
                  uploading={file.status === STATUS_UPLOADING}
                  cancelled={file.status === STATUS_ABORTED}
                  style={{ width: 200, height: 200 }}
                  onCancel={() => file.upload.abort()}
                  onPause={() => file.upload.pause()}
                  onContinue={() => file.upload.continue()}
                  onTryAgain={() => this.startUpload(file.upload.file, fileId)}
                  // onRemove={() => onRemoveFile(uploaderId, fileId)}
                />
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default Upload
