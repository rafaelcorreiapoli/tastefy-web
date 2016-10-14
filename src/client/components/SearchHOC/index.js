import { connect } from 'react-redux'
import _ from 'lodash'

import {
  getPage,
  setSearchText,
  setFilter,
  setSort,
  setPageSize,
  setPage,
  getSearchText,
  getPageSize,
  getFilter,
  getSort,
  newSearch,
} from '@ducks/search'


export default (ComposedComponent, { searchId, searchFn }) => {
  const mapStateToProps = state => ({
    page: getPage(state, searchId),
    searchText: getSearchText(state, searchId),
    filter: getFilter(state, searchId),
    sort: getSort(state, searchId),
    pageSize: getPageSize(state, searchId),
  })

  const mapDispatchToProps = dispatch => {
    const debouncedDispatch = _.debounce(dispatch, 1000)

    return {
      setSearchText(searchText) {
        dispatch(setSearchText(searchId, searchText))
        debouncedDispatch(newSearch(searchId, searchFn))
      },
      setFilter(filter) {
        dispatch(setFilter(searchId, filter))
        debouncedDispatch(newSearch(searchId, searchFn))
      },
      setSort(sort) {
        dispatch(setSort(searchId, sort))
        debouncedDispatch(newSearch(searchId, searchFn))
      },
      setPageSize(pageSize) {
        dispatch(setPageSize(searchId, pageSize))
        debouncedDispatch(newSearch(searchId, searchFn))
      },
      setPage(page) {
        dispatch(setPage(searchId, page))
        debouncedDispatch(newSearch(searchId, searchFn))
      }
    }
  }


  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(ComposedComponent)
}
