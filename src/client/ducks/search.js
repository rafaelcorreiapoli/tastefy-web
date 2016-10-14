import { Map } from 'immutable'

const SET_SEARCH_TEXT = 'search/SET_SEARCH_TEXT'
const SET_PAGE = 'search/SET_PAGE'
const SET_SORT = 'search/SET_SORT'
const SET_FILTER = 'search/SET_FILTER'
const SET_RESULTS = 'search/SET_RESULTS'
const SET_PAGE_SIZE = 'search/SET_PAGE_SIZE'

export const getSearchText = (state, searchId) => state.search.getIn([searchId, 'searchText'])
export const getPage = (state, searchId) => state.search.getIn([searchId, 'page'])
export const getFilter = (state, searchId) => state.search.getIn([searchId, 'filter'])
export const getSort = (state, searchId) => state.search.getIn([searchId, 'sort'])
export const getResults = (state, searchId) => state.search.getIn([searchId, 'results'])
export const getPageSize = (state, searchId) => state.search.getIn([searchId, 'pageSize'])

export const newSearch = (searchId, searchFn) => (dispatch, getState) => {
  const state = getState()
  const page = getPage(state, searchId)
  const searchText = getSearchText(state, searchId)
  const filter = getFilter(state, searchId)
  const sort = getSort(state, searchId)
  const pageSize = getPageSize(state, searchId)

  console.log('calling new search!')
  searchFn && searchFn({
    page,
    searchText,
    filter,
    sort,
    pageSize,
  })
}
export const setSearchText = (searchId, searchText) => ({
  type: SET_SEARCH_TEXT,
  payload: {
    searchId,
    searchText,
  },
})
export const setPage = (searchId, page) => ({
  type: SET_PAGE,
  payload: {
    searchId,
    page,
  },
})
export const setSort = (searchId, sort) => ({
  type: SET_SORT,
  payload: {
    searchId,
    sort,
  },
})
export const setFilter = (searchId, filter) => ({
  type: SET_FILTER,
  payload: {
    searchId,
    filter,
  },
})

export const setPageSize = (searchId, pageSize) => ({
  type: SET_PAGE_SIZE,
  payload: {
    searchId,
    pageSize,
  },
})
export const setResults = (searchId, results) => ({
  type: SET_RESULTS,
  payload: {
    searchId,
    results,
  },
})


const searchShape = {
  searchText: '',
  page: 0,
  sort: 'nome.asc',
  filter: {

  },
  results: {},
  pageSize: 10,
}

const initialState = Map({
  departamentos: Map(searchShape),
  setores: Map(searchShape),
})
export default (state = initialState, action) => {
  if (!action.payload || !action.payload.searchId) return state
  const {
    searchId,
  } = action.payload

  switch (action.type) {
    case SET_SEARCH_TEXT:
      return state.setIn([searchId, 'searchText'], action.payload.searchText)
    case SET_PAGE:
      return state.setIn([searchId, 'page'], action.payload.page)
    case SET_SORT:
      return state.setIn([searchId, 'sort'], action.payload.sort)
    case SET_FILTER:
      return state.setIn([searchId, 'filter'], action.payload.filter)
    case SET_RESULTS:
      return state.setIn([searchId, 'results'], action.payload.results)
    case SET_PAGE_SIZE:
      return state.setIn([searchId, 'pageSize'], action.payload.pageSize)
    default:
      return state
  }
}
