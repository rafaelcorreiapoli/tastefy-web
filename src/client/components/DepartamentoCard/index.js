import React, { PropTypes } from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider'
import { Remove, Calendar, Edit } from '@resources/icons'
import Highlighter from 'react-highlight-words'

const styles = {
  faded: {
    color: '#d3d3d3',
    float: 'right',
  },
  number: {
    display: 'inline-block',
    margin: 0,
  },
}
class DepartamentoCard extends React.Component {
  static defaultProps = {
    funcionariosCount: 0,
    setoresCount: 0,
  }
  static propTypes = {
    nome: PropTypes.string.isRequired,
    responsavel: PropTypes.number,
    funcionariosCount: PropTypes.number.isRequired,
    setoresCount: PropTypes.number.isRequired,
    pai: PropTypes.string,
    style: PropTypes.object,
    highlight: PropTypes.string,
  }
  render() {
    const {
      nome,
      responsavel,
      funcionariosCount,
      setoresCount,
      pai,
      style,
      highlight,
    } = this.props

    return (
      <Card style={style}>
        <CardHeader
          title={
            <Highlighter
              highlightClassName="highlight"
              searchWords={[highlight]}
              textToHighlight={nome}
            />
          }
        />
        <Divider />
        <CardText>
          <p>Responsavel: {responsavel}</p>
          {/* <p>N. funcionários: {funcionariosCount}</p> */}
          <div>
            <h2 style={styles.number}>{funcionariosCount}</h2>
            <span style={styles.faded}> funcionários</span>
          </div>
          <div>
            <h2 style={styles.number}>{setoresCount}</h2>
            <span style={styles.faded}> setores</span>
          </div>
          {
            pai &&
              <p>Departamento pai: {pai}</p>
          }
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

export default DepartamentoCard;
