import React, { PropTypes } from 'react'
import Dropzone from 'react-dropzone'
import FileUploader from '@components/FileUploader'
import fileInputHOC from '@components/FileInputHOC'

class FileInputDrop extends React.Component {
  static propTypes = {
    handleStart: PropTypes.func,
    handleError: PropTypes.func,
    handleSuccess: PropTypes.func,
    handleProgress: PropTypes.func,
    handlePause: PropTypes.func,
    handleAbort: PropTypes.func,
    handleContinue: PropTypes.func,
    handleRemove: PropTypes.func,
    addFiles: PropTypes.func,
    files: PropTypes.array,
  }

  constructor(props) {
    super(props)
    this.onDrop = this.onDrop.bind(this)
  }

  onDrop(files) {
    const {
      addFiles,
    } = this.props

    addFiles(files)
  }

  render() {
    const {
      handleStart,
      handleError,
      handleSuccess,
      handleProgress,
      handlePause,
      handleAbort,
      handleContinue,
      handleRemove,
      files,
    } = this.props

    return (
      <div>
        <Dropzone onDrop={this.onDrop}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
        {
          files.map(({ file, _id }, key) => (
            <FileUploader
              // ref={f => { this.files[key] = f }}
              key={key}
              file={file}
              preview={file.preview}
              onStart={handleStart}
              onError={handleError}
              onSuccess={(newId) => handleSuccess(key, newId)}
              onProgress={handleProgress}
              onPause={handlePause}
              onAbort={handleAbort}
              onContinue={handleContinue}
              _id={_id}
              onRemove={() => handleRemove(key, _id)}
              style={{ width: 200, height: 200 }}
            />
          ))
        }
      </div>
    )
  }
}

export default fileInputHOC(FileInputDrop);
