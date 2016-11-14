import React, {
  Component,
  PropTypes,
} from 'react'
import RestaurantePromocoes from '@components/RestaurantePromocoes'
import RestauranteQuestionarios from '@components/RestauranteQuestionarios'
import { Grid, Row, Col } from 'react-flexbox-grid'

export default class RestauranteDashboard extends Component {
  static defaultProps = {}

  static propTypes = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <RestaurantePromocoes />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <RestauranteQuestionarios />
          </Col>
        </Row>
      </Grid>
    )
  }
}
