import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import { SortIcon } from '@resources/icons'

const styles = {
  paperStyle: {
    padding: '10px 20px 20px 20px',
    marginBottom: 20,
  },
  title: {
    marginBottom: 0,
    marginTop: 0,
  },
}

class SortWrapper extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }
  render() {
    const { children } = this.props
    return (
      <Paper style={Object.assign({}, styles.paperStyle, { marginBottom: 20 })}>
        <div style={{ display: 'flex', alignItems: 'center', paddingTop: 10 }}>
          <SortIcon style={{ marginRight: 10 }} />
          <h3 style={styles.title}>Ordenar</h3>
        </div>
        <div>
          {children}
        </div>
      </Paper>
    )
  }
}

export default SortWrapper;
