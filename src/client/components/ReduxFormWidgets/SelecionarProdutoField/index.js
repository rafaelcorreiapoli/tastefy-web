import React, {
  Component,
  PropTypes,
} from 'react'
import SelecionarProdutoList from '@components/SelecionarProdutoList'

export default class SelecionarProdutoField extends Component {

  static defaultProps = {}

  static propTypes = {
    input: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      input: {
        value,
        onChange,
      },
    } = this.props

    return (
      <SelecionarProdutoList
        value={value || []}
        onCheck={(produtoId, checked) => {
          const newValue = checked
            ? [...value, produtoId]
            : value.filter(v => v !== produtoId)
          onChange(newValue)
        }}
        {...this.props}
      />
    )
  }

}
