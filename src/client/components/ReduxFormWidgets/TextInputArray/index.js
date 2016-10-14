import React, { PropTypes } from 'react'
import { Field } from 'redux-form'
import TextInput from '@components/ReduxFormWidgets/TextInput';
import { IconButton } from 'material-ui'
import { Adicionar, Deletar } from '@resources/icons';
import styles from './styles'

class TextInputArray extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    itemLabel: PropTypes.string,
    minItems: PropTypes.number,
    maxItems: PropTypes.number,
    fields: PropTypes.object,
  }
  render() {
    const {
      label,
      itemLabel,
      minItems,
      maxItems,
      fields,
    } = this.props

    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <span>{label}</span>
          {
            (!maxItems || fields.length < maxItems) &&
              <IconButton
                onClick={() => fields.push()}
                tooltip="Adicionar novo campo"
                style={styles.addButton}
                iconStyle={styles.deleteIcon}
              >
                <Adicionar />
              </IconButton>
          }
        </div>
        {
          fields && fields.map((field, index) => (
            <div key={index} style={styles.valueRow}>
              <Field
                name={field}
                component={TextInput}
                label={`${itemLabel} ${index + 1}`}
              />
              {/* <TextInput {...field} label={`${itemLabel} ${index + 1}`}/>*/}
              {
                (!minItems || index >= minItems) &&
                  <div>
                    <IconButton
                      onClick={() => fields.remove(index)}
                      tooltip="Remover"
                      style={styles.deleteButton}
                      iconStyle={styles.deleteIcon}
                    >
                      <Deletar />
                    </IconButton>
                  </div>
              }
            </div>
          ))
        }
      </div>
    )
  }
}


export default TextInputArray
