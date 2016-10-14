import React, { PropTypes } from 'react'
//  import MatchForm from '@components/MatchForm'
import FilterFuncionarios from '@components/FilterFuncionarios'
import SortFuncionarios from '@components/SortFuncionarios'
import UsuarioCard from '@components/UsuarioCard'
import { Paper } from 'material-ui'
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index'
import TextField from 'material-ui/TextField'
import UltimatePaginationMaterialUi from 'react-ultimate-pagination-material-ui'
import { SpringGrid, layout } from 'react-stonecutter';
import FilterWrapper from '@components/FilterWrapper'
import SortWrapper from '@components/SortWrapper'
import Panel from '@components/Panel'
import { Users } from '@resources/icons'
import makeResponsive from '@helpers/responsive'

const StonecutterGrid = makeResponsive(SpringGrid, {
  minPadding: 10,
  columnWidth: 250,
  gutterWidth: 5,
});

const USUARIO = {
  avatar: 'http://placehold.it/300x300',
  nome: 'Rafael Ribeiro Correia',
  salario: 5000,
  departamento: 'RH',
  setor: 'Contratação',
  cpf: '416.491.798-98',
}
const styles = {
  search: {
    marginBottom: 20,
  },
}



class UsuariosPage extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={3}>
            <FilterWrapper>
              <FilterFuncionarios />
            </FilterWrapper>
            <SortWrapper>
              <SortFuncionarios />
            </SortWrapper>
          </Col>
          <Col xs={12} md={9}>
            <Panel title="Usuários" icon={<Users />}>
              <TextField
                fullWidth
                floatingLabelText="Procurar..."
                style={styles.search}
              />
              <StonecutterGrid
                style={{ margin: 'auto' }}
                columnWidth={250}
                gutterWidth={15}
                gutterHeight={15}
                itemHeight={284}
                springConfig={{ stiffness: 170, damping: 26 }}
              >
                <UsuarioCard {...USUARIO} style={{ width: 250 }} />
                <UsuarioCard {...USUARIO} style={{ width: 250 }} />
                <UsuarioCard {...USUARIO} style={{ width: 250 }} />
                <UsuarioCard {...USUARIO} style={{ width: 250 }} />
                <UsuarioCard {...USUARIO} style={{ width: 250 }} />
                <UsuarioCard {...USUARIO} style={{ width: 250 }} />
              </StonecutterGrid>
              <div style={{ textAlign: 'center', marginTop: 20 }}>
                <UltimatePaginationMaterialUi
                  currentPage={10}
                  totalPages={100}
                  onChange={e => console.log(e)}
                />
              </div>
            </Panel>
          </Col>
        </Row>

      </Grid>
    )
  }
}

export default UsuariosPage;
