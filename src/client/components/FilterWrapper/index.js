import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import { FilterIcon } from '@resources/icons'

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

class FilterWrapper extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }
  render() {
    const { children } = this.props
    return (
      <Paper style={Object.assign({}, styles.paperStyle, { marginBottom: 20 })}>
        <div style={{ display: 'flex', alignItems: 'center', paddingTop: 10 }}>
          <FilterIcon style={{ marginRight: 10 }} />
          <h3 style={styles.title}>Filtrar</h3>
        </div>
        <div>
          {children}
        </div>
      </Paper>
    )
  }
}

export default FilterWrapper;
