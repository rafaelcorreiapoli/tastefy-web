import React, { PropTypes } from 'react'
import FilterUsers from '@components/FilterUsers'
import SortUsers from '@components/SortUsers'
import UserCard from '@components/UserCard'
import { UsersIcon } from '@resources/icons'
import DashboardUI from '@components/DashboardUI'

class UsersDashboard extends React.Component {
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
  _renderResult(user, i) {
    const {
      searchText,
    } = this.props

    return (
      <div key={i} style={{ width: 250 }}>
        <UserCard
          nome={user.profile.nomeCompleto}
          style={{ width: 250 }}
          highlight={searchText}
        />
      </div>

    )
  }

  _renderFilter(filter, setFilter) {
    return (
      <FilterUsers
        value={filter}
        onChange={setFilter}
      />
    )
  }

  _renderSort(sort, setSort) {
    return (
      <SortUsers
        value={sort}
        onChange={setSort}
      />
    )
  }
  render() {
    const {
      searchText,
      setSearchText,
      setFilter,
      setSort,
      setPage,
      results,
      pageSize,
      page,
      totalResults,
      sort,
      loading,
      filter,
    } = this.props

    return (
      <DashboardUI
        title="Usuários"
        titleIcon={<UsersIcon />}
        renderResult={this._renderResult}
        renderFilter={this._renderFilter}
        renderSort={this._renderSort}
        searchText={searchText}
        setSearchText={setSearchText}
        setFilter={setFilter}
        setSort={setSort}
        setPage={setPage}
        results={results}
        pageSize={pageSize}
        page={page}
        totalResults={totalResults}
        sort={sort}
        loading={loading}
        filter={filter}
      />
    )
  }
}

export default UsersDashboard
