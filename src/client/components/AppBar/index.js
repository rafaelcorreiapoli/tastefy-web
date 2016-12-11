import React, { PropTypes } from 'react'
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
    onClickLogoutLink: PropTypes.func,
    go: PropTypes.func,
  }
  render() {
    const {
      onClickToggleMenu,
      onClickLogoutLink,
      go,
    } = this.props
    return (
      <MUIAppBar
        titleStyle={{
          textAlign: 'center',
        }}
        title="TASTEFY - ADMIN"
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
            {/* <MenuItem
              leftIcon={<Profile />}
              primaryText="Profile"
              onClick={onClickProfileLink}
            /> */}

            <MenuItem
              leftIcon={<Add />}
              primaryText="Adicionar restaurante"
              onClick={() => go('/restaurantes/add')}
            />
            <MenuItem
              leftIcon={<Add />}
              primaryText="Adicionar usuário"
              onClick={() => go('/usuarios/add')}
            />
            {/* <MenuItem
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
            */}
            <Divider />
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


export default AppBar
