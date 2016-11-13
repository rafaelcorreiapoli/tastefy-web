import React, { PropTypes } from 'react'
import { Drawer as MUDrawer, MenuItem } from 'material-ui';
import FontIcon from 'material-ui/FontIcon';
import {
  Users,
  DepartamentosIcon,
  SetoresIcon,
  FuncionariosIcon,
} from '@resources/icons'

class Drawer extends React.Component {
  static propTypes = {
    onClickAdd: PropTypes.func,
    onChangeDrawerState: PropTypes.func,
    drawerOpen: PropTypes.bool.isRequired,
    go: PropTypes.func,
  }

  render() {
    const {
      drawerOpen,
      onChangeDrawerState,
      go,
    } = this.props

    return (
      <MUDrawer
        docked={false}
        open={drawerOpen}
        onRequestChange={(open) => onChangeDrawerState(open)}
      >
        <MenuItem
          leftIcon={<DepartamentosIcon />}
          onClick={() => go('/restaurantes')}
        >
          Restaurantes
        </MenuItem>
        <MenuItem
          leftIcon={<SetoresIcon />}
          onClick={() => go('/usuarios')}
        >
          Usuários
        </MenuItem>
      </MUDrawer>
    )
  }
}

export default Drawer
