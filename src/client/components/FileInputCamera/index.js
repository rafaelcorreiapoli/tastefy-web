import React, { PropTypes } from 'react'
import FileUploader from '@components/FileUploader'
import TirarFoto from '@components/TirarFoto'
import fileInputHOC from '@components/FileInputHOC'

class FileInputCamera extends React.Component {
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
    this.onFotoTirada = this.onFotoTirada.bind(this)
  }

  onFotoTirada(foto) {
    const {
      addFiles,
    } = this.props
    const files = [foto]

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
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <TirarFoto onFotoTirada={this.onFotoTirada} style={{ marginBottom: 20 }} />
        <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }}>
          {
            files.map(({ file, _id }, key) => (
              <FileUploader
                // ref={f => { this.files[key] = f }}
                key={key}
                file={file}
                preview={file}
                onStart={handleStart}
                onError={handleError}
                uploadConfig={{ isBase64: true, fileName: 'teste' }}
                onSuccess={newId => handleSuccess(key, newId)}
                onProgress={handleProgress}
                onPause={handlePause}
                onAbort={handleAbort}
                onContinue={handleContinue}
                _id={_id}
                onRemove={() => handleRemove(_id)}
                style={{ width: 200, height: 200 }}
              />
            ))
          }
        </div>
      </div>
    )
  }
}

export default fileInputHOC(FileInputCamera);
