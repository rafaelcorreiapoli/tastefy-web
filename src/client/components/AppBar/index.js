import React, { PropTypes } from 'react';
import {
  AppBar as MUIAppBar,
  IconButton,
  MenuItem,
  Divider,
} from 'material-ui'
import IconMenu from 'material-ui/IconMenu'
import { Menu, Add, Logout, Help, Profile } from '@resources/icons'

class AppBar extends React.Component {
  static propTypes = {
    onClickToggleMenu: PropTypes.func,
    onClickProfileLink: PropTypes.func,
    onClickHelpLink: PropTypes.func,
    onClickLogoutLink: PropTypes.func,
    onClickAddDepartamento: PropTypes.func,
    onClickAddSetor: PropTypes.func,
    onClickAddFuncionario: PropTypes.func,
    onClickAddFalta: PropTypes.func,
  }
  render() {
    const {
      onClickToggleMenu,
      onClickProfileLink,
      onClickHelpLink,
      onClickLogoutLink,
      onClickAddDepartamento,
      onClickAddSetor,
      onClickAddFuncionario,
      onClickAddFalta,
    } = this.props
    return (
      <MUIAppBar
        titleStyle={{
          textAlign: 'center',
        }}
        title="BOUNTIFY - ADMIN"
        style={{ color: 'black' }}
        onLeftIconButtonTouchTap={onClickToggleMenu}
        iconElementRight={
          <IconMenu
            iconButtonElement={
              <IconButton><Menu /></IconButton>
            }
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <MenuItem
              leftIcon={<Profile />}
              primaryText="Profile"
              onClick={onClickProfileLink}
            />
            <Divider />
            <MenuItem
              leftIcon={<Add />}
              primaryText="Adicionar departamento"
              onClick={onClickAddDepartamento}
            />
            <MenuItem
              leftIcon={<Add />}
              primaryText="Adicionar setor"
              onClick={onClickAddSetor}
            />
            <MenuItem
              leftIcon={<Add />}
              primaryText="Adicionar funcionário"
              onClick={onClickAddFuncionario}
            />
            <MenuItem
              leftIcon={<Add />}
              primaryText="Registrar falta"
              onClick={onClickAddFalta}
            />
            <MenuItem
              leftIcon={<Help />}
              primaryText="Ajuda"
              onClick={onClickHelpLink}
            />
            <MenuItem
              leftIcon={<Logout />}
              primaryText="Logout"
              onClick={onClickLogoutLink}
            />
          </IconMenu>
        }
      />
    )
  }
}



export default AppBar;
