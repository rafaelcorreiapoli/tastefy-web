import React, {
  Component,
  PropTypes,
} from 'react'
import SelecionarProdutoItem from '@components/SelecionarProdutoItem'
import _ from 'lodash'
import Divider from 'material-ui/Divider'

export default class SelecionarProdutoList extends Component {

  static defaultProps = {
    value: [],
  }

  static propTypes = {
    produtos: PropTypes.array,
    value: PropTypes.array,
    onCheck: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      produtos,
      value,
      onCheck,
    } = this.props

    return (
      <div>
        {
          produtos && produtos.map((produto, i) => (
            <div key={i}>
              <SelecionarProdutoItem
                onCheck={isChecked => onCheck(produto._id, isChecked, i)}
                checked={value.includes(produto._id)}
                {...produto}
              />
              <Divider style={{ marginBottom: 10, marginTop: 10 }} />
            </div>

          ))
        }
      </div>
    )
  }

}
