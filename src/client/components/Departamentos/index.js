import React, { PropTypes } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index'
import FilterDepartamentos from '@components/FilterDepartamentos'
import SortDepartamentos from '@components/SortDepartamentos'
import DepartamentoCard from '@components/DepartamentoCard'
import { CSSGrid, measureItems } from 'react-stonecutter';
import UltimatePaginationMaterialUi from 'react-ultimate-pagination-material-ui'
import makeResponsive from '@helpers/responsive'
import FilterWrapper from '@components/FilterWrapper'
import SortWrapper from '@components/SortWrapper'
import Panel from '@components/Panel'
import { DepartamentosIcon } from '@resources/icons'
import MDSpinner from 'react-md-spinner'
import SearchText from '@components/SearchText'

const styles = {
  paperStyle: {
    padding: '10px 20px 20px 20px',
    marginBottom: 20,
  },
  title: {
    marginBottom: 0,
    marginTop: 0,
  },
  search: {
    marginBottom: 20,
  },
  loadingContainer: {
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nenhumResultadoContainer: {
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}

const ResultsGrid = makeResponsive(measureItems(CSSGrid, { measureImages: true }), {
  minPadding: 10,
  columnWidth: 250,
  gutterWidth: 5,
});

class Departamentos extends React.Component {
  static propTypes = {
    searchText: PropTypes.string,
    setSearchText: PropTypes.func,
    setFilter: PropTypes.func,
    setSort: PropTypes.func,
    setPage: PropTypes.func,
    results: PropTypes.array,
    pageSize: PropTypes.number,
    page: PropTypes.number,
    totalResults: PropTypes.number,
    sort: PropTypes.string,
    loading: PropTypes.bool,
    filter: PropTypes.object,
  }
  render() {
    const {
      searchText,
      setSearchText,
      setFilter,
      setSort,
      setPage,
      totalResults,
      pageSize,
      page,
      sort,
      filter,
      loading,
      results = [],
    } = this.props

    return (
      <Grid style={{ maxWidth: 1440, width: '100%' }}>
        <Row>
          <Col xs={12} md={3}>
            <FilterWrapper>
              <FilterDepartamentos
                value={filter}
                onChange={setFilter}
              />
            </FilterWrapper>
            <SortWrapper>
              <SortDepartamentos
                value={sort}
                onChange={setSort}
              />
            </SortWrapper>
          </Col>
          <Col xs={12} md={9}>
            <Panel title="Departamentos" icon={<DepartamentosIcon />}>
              <SearchText
                fullWidth
                floatingLabelText="Procurar..."
                value={searchText}
                onChange={setSearchText}
              />
              {
                loading ?
                  <div style={styles.loadingContainer}>
                    <MDSpinner />
                  </div>
                :
                  results.length ?
                    <div>
                      <ResultsGrid
                        gutterHeight={20}
                        duration={200}
                        easing="ease-out"
                        springConfig={{ stiffness: 170, damping: 26 }}
                      >
                        {
                          results.map((departamento, i) =>
                            <DepartamentoCard
                              key={i}
                              {...departamento}
                              style={{ width: 250 }}
                              highlight={searchText}
                            />
                          )
                        }
                      </ResultsGrid>
                      <div style={{ textAlign: 'center', marginTop: 20 }}>
                        <UltimatePaginationMaterialUi
                          currentPage={page + 1}
                          totalPages={Math.floor(totalResults / pageSize) + 1}
                          onChange={newPage => setPage(newPage - 1)}
                        />
                      </div>
                    </div>
                  :
                    <div style={styles.nenhumResultadoContainer}>
                      <i>Nenhum resultado foi encontrado</i>
                    </div>
              }
            </Panel>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Departamentos;
