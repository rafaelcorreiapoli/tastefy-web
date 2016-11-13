import React, { PropTypes } from 'react'
import FilterDepartamentos from '@components/FilterDepartamentos'
import SortDepartamentos from '@components/SortDepartamentos'
import RestauranteCard from '@components/RestauranteCard'
import { RestaurantesIcon } from '@resources/icons'
import DashboardUI from '@components/DashboardUI'

class RestaurantesDashboard extends React.Component {
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

  constructor(props) {
    super(props)
    this._renderResult = this._renderResult.bind(this)
    this._renderFilter = this._renderFilter.bind(this)
    this._renderSort = this._renderSort.bind(this)
  }
  _renderResult(restaurante, i) {
    const {
      searchText,
    } = this.props

    return (
      <RestauranteCard
        key={i}
        {...restaurante}
        style={{ width: 250 }}
        highlight={searchText}
      />
    )
  }

  _renderFilter(filter, setFilter) {
    return (
      <FilterDepartamentos
        value={filter}
        onChange={setFilter}
      />
    )
  }

  _renderSort(sort, setSort) {
    return (
      <SortDepartamentos
        value={sort}
        onChange={setSort}
      />
    )
  }
  render() {
    return (
      <DashboardUI
        title="Restaurantes"
        titleIcon={<RestaurantesIcon />}
        renderResult={this._renderResult}
        renderFilter={this._renderFilter}
        renderSort={this._renderSort}
        {...this.props}
      />
    )
  }
}

export default RestaurantesDashboard
