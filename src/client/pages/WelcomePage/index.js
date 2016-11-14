import React, { PropTypes } from 'react'
import Calendar from '@components/Calendar'
import Webcam from 'react-webcam';
import MontarQuestionario from '@components/MontarQuestionario'
import { Grid, Row, Col } from 'react-flexbox-grid'

class WelcomePage extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <MontarQuestionario />
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default WelcomePage;
