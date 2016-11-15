import searchHOC from '@components/SearchHOC'
import RestaurantesDashboard from '@components/RestaurantesDashboard'
import { Meteor } from 'meteor/meteor'
import { composeWithTracker } from 'react-komposer'
import { Counts } from 'meteor/tmeasday:publish-counts'
import convertSortStringToObject from '@utils/convert_sort_object'
import convertFormObjectToFilterObject, { RANGE } from '@utils/convert_filter_object'
import Loading from '@components/Loading'
import Restaurantes from '@collections/restaurantes'
import withLinks from '@hocs/withLinks'

const composer = (props, onData) => {
  const {
    page,
    searchText,
    filter,
    sort,
    pageSize,
  } = props

  const limit = pageSize
  const skip = pageSize * page


  const sortObject = convertSortStringToObject(sort)

  const filterObject = filter ? convertFormObjectToFilterObject(filter.toJS(), {
    funcionariosCount: RANGE,
    setoresCount: RANGE,
  }) : {}

  const handler = Meteor.subscribe('restaurantes', {
    searchText,
    limit,
    skip,
    filter: filterObject,
    sort: sortObject,
  })


  if (handler.ready()) {
    const totalResults = Counts.get('restaurantes.count')
    const selector = {
      nome: new RegExp(searchText, 'i'),
      ...filterObject,
    }

    const options = {
      sort: sortObject,
    }

    const results = Restaurantes.find(selector, options).fetch()

    onData(null, {
      results,
      totalResults,
      loadingResults: false,
    })
  }
}

export default searchHOC(composeWithTracker(composer, Loading)(withLinks(RestaurantesDashboard)), {
  searchId: 'restaurantes',
})
