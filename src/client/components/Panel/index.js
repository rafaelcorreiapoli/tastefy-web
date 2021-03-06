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
  toolbar: {
    float: 'right',
    alignSelf: 'flex-end',
  },
}

class FilterWrapper extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    icon: PropTypes.element,
    style: PropTypes.object,
    toolbar: PropTypes.node,
  }
  render() {
    const {
      title,
      icon,
      children,
      style,
      toolbar,
      ...props,
    } = this.props
    return (
      <Paper style={Object.assign({}, styles.paperStyle, style)} {...props}>
        <div style={{ display: 'flex', alignItems: 'center', paddingTop: 10 }}>
          {icon && React.cloneElement(icon, {
            style: { marginRight: 10 },
          })}
          <h3 style={styles.title}>{title}</h3>
          <div style={styles.toolbar}>
            {toolbar && toolbar}
          </div>
        </div>
        <div>
          {children}
        </div>
      </Paper>
    )
  }
}

export default FilterWrapper;
