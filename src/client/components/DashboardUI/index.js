import React, { PropTypes } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index'
import { CSSGrid, measureItems, makeResponsive } from 'react-stonecutter'
import UltimatePaginationMaterialUi from 'react-ultimate-pagination-material-ui'
// import makeResponsive from '@helpers/responsive'
import FilterWrapper from '@components/FilterWrapper'
import SortWrapper from '@components/SortWrapper'
import Panel from '@components/Panel'
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

const ResultsGrid = makeResponsive(CSSGrid, {
  maxWidth: 1036,
  minPadding: 10,
})

class DashboardUI extends React.Component {
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
    loadingResults: PropTypes.bool,
    filter: PropTypes.object,
    title: PropTypes.string,
    titleIcon: PropTypes.element,
    renderResult: PropTypes.func,
    renderFilter: PropTypes.func,
    renderSort: PropTypes.func,
  }

  _renderResultsGrid() {
    const {
      results,
      loadingResults,
      page,
      renderResult,
      totalResults,
      pageSize,
      setPage,
    } = this.props

    if (loadingResults) {
      return (
        <div style={styles.loadingContainer}>
          <MDSpinner />
        </div>
      )
    }

    console.log(results)
    if (results.length) {
      return (
        <div>
          <ResultsGrid
            gutterHeight={20}
            columnWidth={250}
            gutterWidth={5}
            easing="ease-out"
            springConfig={{ stiffness: 170, damping: 26 }}
            duration={200}
          >
            { results.map(renderResult) }
          </ResultsGrid>
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <UltimatePaginationMaterialUi
              currentPage={page + 1}
              totalPages={Math.floor(totalResults / pageSize) + 1}
              onChange={newPage => setPage(newPage - 1)}
            />
          </div>
        </div>
      )
    }

    return (
      <div style={styles.nenhumResultadoContainer}>
        <i>Nenhum resultado foi encontrado</i>
      </div>
    )
  }
  render() {
    const {
      searchText,
      setSearchText,
      setFilter,
      filter,
      renderFilter,
      setSort,
      sort,
      renderSort,
      title,
      titleIcon,
    } = this.props

    return (
      <Grid style={{ maxWidth: 1440, width: '100%' }}>
        <Row>
          <Col xs={12} md={3}>
            <FilterWrapper>
              {renderFilter(filter, setFilter)}
            </FilterWrapper>
            <SortWrapper>
              {renderSort(sort, setSort)}
            </SortWrapper>
          </Col>
          <Col xs={12} md={9}>
            <Panel title={title} icon={titleIcon}>
              <SearchText
                fullWidth
                floatingLabelText="Procurar..."
                value={searchText}
                onChange={setSearchText}
              />
              { this._renderResultsGrid() }
            </Panel>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default DashboardUI
