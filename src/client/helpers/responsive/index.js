import React, { PropTypes } from 'react'
import sizeMe from 'react-sizeme'

export default (ComposedComponent, { gutterWidth, minPadding, columnWidth }) => {
  class Comp extends React.Component {
    static propTypes = {
      children: PropTypes.node,
      size: PropTypes.object,
    }
    render() {
      const { children, size, ...props } = this.props
      const columns = Math.floor((size.width - minPadding) / (columnWidth + gutterWidth));
      return (
        <div>
          {React.createElement(ComposedComponent, {
            style: { margin: 'auto' },
            columns,
            columnWidth,
            gutterWidth,
            ...props,
          }, children)}
        </div>
      );
    }
  }
  return sizeMe()(Comp)
}
