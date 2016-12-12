import React, { PropTypes } from 'react'
import FilterRestaurantes from '@components/FilterRestaurantes'
import SortRestaurantes from '@components/SortRestaurantes'
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
    go: PropTypes.func,
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
      go,
      askToDelete,
      deleteEntityId,
    } = this.props

    return (
      <div
        key={i}
        style={{ width: 250 }}
      >
        <RestauranteCard
          {...restaurante}
          highlight={searchText}
          onClickRestaurante={() => go(`/restaurantes/${restaurante._id}`)}
          onClickDelete={() => askToDelete(deleteEntityId, restaurante._id, `Deseja deletar ${restaurante.nome}`)}
        />
      </div>

    )
  }

  _renderFilter() {
    const {
      filter,
      setFilter,
    } = this.props
    return (
      <FilterRestaurantes
        value={filter}
        onChange={setFilter}
      />
    )
  }

  _renderSort() {
    const {
      sort,
      setSort,
    } = this.props
    return (
      <SortRestaurantes
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
