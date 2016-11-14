import React, {
  Component,
  PropTypes,
} from 'react'
import Panel from '@components/Panel'
import { RestaurantesIcon } from '@resources/icons'

const styles = {
  logoUrl: {
    width: '100%',
    height: 'auto',
    marginTop: 20,
  },
}
export default class RestauranteDetalhes extends Component {

  static defaultProps = {}

  static propTypes = {
    nome: PropTypes.string,
    categoria: PropTypes.string,
    logoUrl: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      nome,
      categoria,
      logoUrl,
    } = this.props
    return (
      <Panel title={nome} icon={<RestaurantesIcon />} >
        <img src={logoUrl} style={styles.logoUrl} />
        <p>Categoria: {categoria}</p>
      </Panel>
    )
  }

}
