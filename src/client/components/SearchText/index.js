import React, { PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import _ from 'lodash'

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    //  justifyContent: 'center',
  },
  input: {
    fontSize: 32,
  },
  field: {
    height: 80,
  },
}

class BuscaInput extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
  }
  constructor(props) {
    super(props)

    this.debouncedOnChange = _.debounce(props.onChange, 300)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      value: props.value,
    }
  }

  handleChange(value) {
    this.setState({
      value,
    })
    this.debouncedOnChange(value)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value,
    })
  }
  render() {
    const {
      ...props,
    } = this.props

    const {
      value,
    } = this.state

    return (
      <div style={styles.container}>
        <TextField
          {...props}
          name="search"
          onChange={v => this.handleChange(v.target.value)}
          value={value}
        />
      </div>
    )
  }
}


export default BuscaInput
