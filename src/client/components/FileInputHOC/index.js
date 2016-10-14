import React, { PropTypes } from 'react'

export default ComposedComponent =>
  class extends React.Component {
    static propTypes = {
      input: PropTypes.object,
    }

    constructor(props) {
      super(props)

      this.state = {
        files: [],
      }
      this.handleSuccess = this.handleSuccess.bind(this)
      this.handleRemove = this.handleRemove.bind(this)
      this.addFiles = this.addFiles.bind(this)
    }


    handleSuccess(i, _id) {
      const {
        input: {
          onChange,
          value,
        },
      } = this.props
      const oldFile = this.state.files[i]
      const newFile = {
        ...oldFile,
        _id,
      }

      this.setState({
        files: [
          ...this.state.files.slice(0, i),
          newFile,
          ...this.state.files.slice(i + 1),
        ],
      }, () => {
        let newValue = []
        if (Array.isArray(value)) {
          newValue = [
            ...value,
            _id,
          ]
        } else {
          newValue = [_id]
        }
        onChange(newValue)
      })
    }

    handleRemove(fileId) {
      const {
        input: {
          value,
          onChange,
        },
      } = this.props

      const files = this.state.files.filter(file => file._id !== fileId)

      this.setState({
        files,
      }, () => {
        let newValue = []
        if (Array.isArray(value)) {
          newValue = value.filter(id => id !== fileId)
        }
        onChange(newValue)
      })
    }


    handleStart() {

    }
    handleError() {

    }

    handleProgress() {

    }
    handlePause() {

    }
    handleAbort() {

    }
    handleContinue() {

    }

    addFiles(files) {
      const arr = files.map(file => ({ file, _id: null }))

      this.setState(currentState => ({
        files: [
          ...currentState.files,
          ...arr,
        ],
      }))
    }
    render() {
      return (
        <ComposedComponent
          handleSuccess={this.handleSuccess}
          handleRemove={this.handleRemove}
          handleStart={this.handleStart}
          handleError={this.handleError}
          handleProgress={this.handleProgress}
          handlePause={this.handlePause}
          handleAbort={this.handleAbort}
          handleContinue={this.handleContinue}
          addFiles={this.addFiles}
          files={this.state.files}
          {...this.props}
        />
      )
    }
  }
