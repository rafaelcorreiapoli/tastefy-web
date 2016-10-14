import React, { PropTypes } from 'react'
import { Paper } from 'material-ui'
class Statistics extends React.Component {
  render() {
    return (
    <Paper style={{padding: 20, textAlign: 'center'}}>
      <h3 style={{fontWeight: 200}}>Total de jogadores: <b>5012</b></h3>
      <h3 style={{fontWeight: 200}}>Matchs feitos: <b>53012</b></h3>
      <h3 style={{fontWeight: 200}}>Buscas feitos: <b>54000</b></h3>
    </Paper>
    )
  }
}

export default Statistics;
