import React, {
  Component,
  PropTypes,
} from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import RestauranteDetalhes from '@components/RestauranteDetalhes'


export default class Restaurante extends Component {

  static defaultProps = {}

  static propTypes = {
    children: PropTypes.node,
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
      children,
      nome,
      categoria,
      logoUrl,
    } = this.props

    return (
      <Grid>
        <Row>
          <Col xs={3}>
            <RestauranteDetalhes
              nome={nome}
              categoria={categoria}
              logoUrl={logoUrl}
            />
          </Col>
          <Col xs={9}>
            {children}
          </Col>
        </Row>
      </Grid>
    )
  }

}
