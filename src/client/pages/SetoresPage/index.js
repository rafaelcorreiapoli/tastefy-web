import React, { PropTypes } from 'react'
import Setores from '@containers/Setores'



class SetoresPage extends React.Component {
  render() {
    return (
      <Setores />
    )
  }
}

export default SetoresPage;

//
// import React, { PropTypes } from 'react'
// //  import MatchForm from '@components/MatchForm'
// import FilterSetores from '@components/FilterSetores'
// import SortSetores from '@components/SortSetores'
// import UsuarioCard from '@components/UsuarioCard'
// import { Paper } from 'material-ui'
// import { Grid, Row, Col } from 'react-flexbox-grid/lib/index'
// import TextField from 'material-ui/TextField'
// import FilterWrapper from '@components/FilterWrapper'
// import SortWrapper from '@components/SortWrapper'
// import Panel from '@components/Panel'
// import { SpringGrid, makeResponsive } from 'react-stonecutter';
// import UltimatePaginationMaterialUi from 'react-ultimate-pagination-material-ui'
// import { SetoresIcon } from '@resources/icons'
//
// const StonecutterGrid = makeResponsive(SpringGrid, {
//   maxWidth: 900,
//   minPadding: 100
// });
//
// const USUARIO = {
//   avatar: 'http://placehold.it/300x300',
//   nome: 'Rafael Ribeiro Correia',
//   salario: 5000,
//   departamento: 'RH',
//   setor: 'Contratação',
//   cpf: '416.491.798-98',
// }
//
// const styles = {
//   search: {
//     marginBottom: 20,
//   },
// }
//
// class SetoresPage extends React.Component {
//   render() {
//     return (
//       <Grid>
//         <Row>
//           <Col xs={12} md={3}>
//             <FilterWrapper>
//               <FilterSetores />
//             </FilterWrapper>
//             <SortWrapper>
//               <SortSetores />
//             </SortWrapper>
//           </Col>
//           <Col xs={12} md={9}>
//             <Panel title="Setores" icon={<SetoresIcon />}>
//               <TextField
//                 fullWidth
//                 floatingLabelText="Procurar..."
//                 style={styles.search}
//               />
//               <StonecutterGrid
//                 style={{ margin: 'auto' }}
//                 columnWidth={250}
//                 gutterWidth={15}
//                 gutterHeight={15}
//                 itemHeight={284}
//                 springConfig={{ stiffness: 170, damping: 26 }}
//               >
//                 <UsuarioCard {...USUARIO} style={{ width: 250 }} />
//                 <UsuarioCard {...USUARIO} style={{ width: 250 }} />
//                 <UsuarioCard {...USUARIO} style={{ width: 250 }} />
//                 <UsuarioCard {...USUARIO} style={{ width: 250 }} />
//                 <UsuarioCard {...USUARIO} style={{ width: 250 }} />
//                 <UsuarioCard {...USUARIO} style={{ width: 250 }} />
//               </StonecutterGrid>
//               <div style={{ textAlign: 'center', marginTop: 20 }}>
//                 <UltimatePaginationMaterialUi
//                   currentPage={10}
//                   totalPages={100}
//                   onChange={e => console.log(e)}
//                 />
//               </div>
//             </Panel>
//           </Col>
//         </Row>
//
//       </Grid>
//     )
//   }
// }
//
// export default SetoresPage;
