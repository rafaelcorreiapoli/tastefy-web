import React, {
  Component,
  PropTypes,
} from 'react'
import Checkbox from 'material-ui/Checkbox'
import { ListItem } from 'material-ui/List'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagemUrl: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  checkboxContainer: {
    width: 50,
  },
}
export default class SelecionarProdutoItem extends Component {

  static defaultProps = {}

  static propTypes = {
    imagemUrl: PropTypes.string,
    nome: PropTypes.string,
    checked: PropTypes.bool,
    onCheck: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      imagemUrl,
      nome,
      checked,
      onCheck,
    } = this.props
    return (
      <div style={styles.container}>
        <div style={styles.checkboxContainer}>
          <Checkbox
            onCheck={(e, isChecked) => onCheck(isChecked)}
            checked={checked}
          />
        </div>
        <img src={imagemUrl} style={styles.imagemUrl} />
        <span>{nome}</span>
      </div>
    )
  }

}
