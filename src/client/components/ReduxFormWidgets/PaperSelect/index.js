import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import Radium from 'radium'
import { ACCENT } from '@resources/colors'

const RadiumPaper = Radium(Paper);

const styles = {
  selectedStyle: {
    backgroundColor: ACCENT,
    color: 'white',
  },
  cardStyle: {
    padding: 10,
    cursor: 'pointer',
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  },
}


class PaperSelect extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    options: PropTypes.array,
    input: PropTypes.object,
  }
  render() {
    const {
      label,
      options,
      input: {
        onChange,
        value,
      },
    } = this.props
    return (
      <div>
        <h3 style={{ textAlign: 'center' }}>{label}</h3>
        <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {
            options.map(option => {
              const isSelected = value === option.value;
              return (
                <RadiumPaper
                  key={option.value}
                  onClick={() => onChange(option.value)}
                  style={Object.assign({},
                    styles.cardStyle,
                    isSelected && styles.selectedStyle)
                  }
                >
                  <span>
                      {option.label}
                  </span>
                </RadiumPaper>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default Radium(PaperSelect)
