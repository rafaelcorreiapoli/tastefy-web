import React, { PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'
import Slider from 'rc-slider'
import _ from 'lodash'

class FilterDepartamentos extends React.Component {
  static propTypes = {
    maxFuncionariosCount: PropTypes.number,
    maxSetoresCount: PropTypes.number,
    value: PropTypes.shape({
      funcionariosCount: PropTypes.array,
      setoresCount: PropTypes.array,
    }),
    onChange: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.debouncedOnChange = _.debounce(props.onChange, 1000)

    this.state = {
      newValue: {
        funcionariosCount: props.value.funcionariosCount,
        setoresCount: props.value.setoresCount,
      },
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleAfterChange = this.handleAfterChange.bind(this)
  }
  handleChange(key, v) {
    const {
      value,
    } = this.props

    const newValue = {
      ...value,
      [key]: v,
    }
    this.setState({
      newValue,
    })
  }

  handleAfterChange() {
    const {
      onChange,
    } = this.props

    onChange(this.state.newValue)
  }
  render() {
    const {
      maxFuncionariosCount = 100,
      maxSetoresCount = 100,
    } = this.props

    const {
      newValue: {
        funcionariosCount,
        setoresCount,
      },
    } = this.state
    return (
      <div>
        {/* <h4>Número de funcionários</h4>
        <Slider
          range
          value={funcionariosCount}
          min={0}
          max={maxFuncionariosCount}
          onChange={v => this.handleChange('funcionariosCount', v)}
          onAfterChange={this.handleAfterChange}
        />
        <h4>Número de setores</h4>
        <Slider
          range
          value={setoresCount}
          min={0}
          max={maxSetoresCount}
          onChange={v => this.handleChange('setoresCount', v)}
          onAfterChange={this.handleAfterChange}
        /> */}
      </div>
    )
  }
}

export default reduxForm({
  form: 'filterDepartamentos',
})(FilterDepartamentos)
