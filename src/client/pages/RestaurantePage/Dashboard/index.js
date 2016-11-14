import React, {
  Component,
  PropTypes,
} from 'react'

import RestauranteQuestionarios from '@containers/RestauranteQuestionarios'
import RestaurantePromocoes from '@containers/RestaurantePromocoes'
import RestauranteProdutos from '@containers/RestauranteProdutos'

import { Grid, Row, Col } from 'react-flexbox-grid'
import Panel from '@components/Panel'
import { Add } from '@resources/icons'
import IconButton from 'material-ui/IconButton'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

class Dashboard extends Component {

  static defaultProps = {}

  static propTypes = {
    params: PropTypes.shape({
      restauranteId: PropTypes.string,
    }),
    go: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      params: {
        restauranteId,
      },
      go,
    } = this.props

    return (
      <Grid fluid>
        <Row>
          <Col md={12} xs={12}>
            <Panel
              title="Promoções"
              toolbar={
                <IconButton
                  onTouchTap={() => go(`/restaurantes/${restauranteId}/promocoes/add`)}
                  tooltip="Adicionar Promoção"
                >
                  <Add />
                </IconButton>
              }
            >
              <RestaurantePromocoes
                restauranteId={restauranteId}
              />
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col md={12} xs={12}>
            <Panel
              title="Questionários"
              toolbar={
                <IconButton
                  onTouchTap={() => go(`/restaurantes/${restauranteId}/questionarios/add`)}
                  tooltip="Adicionar Promoção"
                >
                  <Add />
                </IconButton>
              }
            >
              <RestauranteQuestionarios
                restauranteId={restauranteId}
              />
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col md={12} xs={12}>
            <Panel
              title="Produtos"
              toolbar={
                <IconButton
                  onTouchTap={() => go(`/restaurantes/${restauranteId}/produtos/add`)}
                  tooltip="Adicionar Produto"
                >
                  <Add />
                </IconButton>
              }
            >
              <RestauranteProdutos
                restauranteId={restauranteId}
              />
            </Panel>
          </Col>
        </Row>
      </Grid>
    )
  }
}


export default connect(null, dispatch => ({
  go(where) {
    dispatch(push(where))
  },
}))(Dashboard)
