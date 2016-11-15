import React, { PropTypes } from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider'
import { Remove, Edit } from '@resources/icons'
import Highlighter from 'react-highlight-words'

class RestauranteCard extends React.Component {
  static defaultProps = {
    funcionariosCount: 0,
    setoresCount: 0,
  }
  static propTypes = {
    nome: PropTypes.string.isRequired,
    style: PropTypes.object,
    highlight: PropTypes.string,
    onClickRestaurante: PropTypes.func,
  }
  render() {
    const {
      style,
      nome,
      highlight,
      onClickRestaurante,
    } = this.props

    return (
      <Card style={style}>
        <CardHeader
          title={
            <FlatButton
              onTouchTap={onClickRestaurante}
            >
            <Highlighter
              highlightClassName="highlight"
              searchWords={[highlight]}
              textToHighlight={nome}
            />
            </FlatButton>

          }
        />
        <Divider />
        <CardText>
          teste
        </CardText>
        <Divider />
        <CardActions>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <IconButton tooltip="Remover">
              <Remove />
            </IconButton>
            {/* <IconButton tooltip="Histórico">
              <Calendar />
            </IconButton> */}
            <IconButton tooltip="Editar">
              <Edit />
            </IconButton>
          </div>

        </CardActions>
      </Card>
    )
  }
}

export default RestauranteCard
