import React, {
  Component,
  PropTypes,
} from 'react'

import RestauranteQuestionarios from '@containers/RestauranteQuestionarios'
import RestaurantePromocoes from '@containers/RestaurantePromocoes'
import { Grid, Row, Col } from 'react-flexbox-grid'
import Panel from '@components/Panel'

export default class Dashboard extends Component {

  static defaultProps = {}

  static propTypes = {
    params: PropTypes.shape({
      restauranteId: PropTypes.string,
    })
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
    } = this.props

    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <Panel title="Promoções">
              <RestaurantePromocoes
                restauranteId={restauranteId}
              />
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Panel title="Questionários">
              <RestauranteQuestionarios
                restauranteId={restauranteId}
              />
            </Panel>
          </Col>
        </Row>
      </Grid>
    )
  }

}
