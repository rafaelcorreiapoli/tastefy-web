import React, { PropTypes } from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider'
import { Phone, Calendar, Edit } from '@resources/icons'

class UsuarioCard extends React.Component {
  static propTypes = {
    avatar: PropTypes.string.isRequired,
    nome: PropTypes.string.isRequired,
    salario: PropTypes.number.isRequired,
    departamento: PropTypes.string.isRequired,
    setor: PropTypes.string.isRequired,
    cpf: PropTypes.string.isRequired,
    style: PropTypes.object,
  }
  render() {
    const {
      avatar,
      nome,
      salario,
      departamento,
      setor,
      cpf,
      style,
    } = this.props

    return (
      <Card style={style}>
        <CardHeader
          title={nome}
          subtitle={`R$ ${salario}`}
          avatar={avatar}
        />
        <Divider />
        <CardText>
          <p>{departamento}</p>
          <p>{setor}</p>
          <p>{cpf}</p>
        </CardText>
        <Divider />
        <CardActions>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <IconButton tooltip="Contato">
              <Phone />
            </IconButton>
            <IconButton tooltip="Histórico">
              <Calendar />
            </IconButton>
            <IconButton tooltip="Editar">
              <Edit />
            </IconButton>
          </div>

        </CardActions>
      </Card>
    )
  }
}

export default UsuarioCard;
