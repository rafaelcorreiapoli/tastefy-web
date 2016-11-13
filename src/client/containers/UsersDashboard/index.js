import searchHOC from '@components/SearchHOC'
import UsersDashboard from '@components/UsersDashboard'
import { Meteor } from 'meteor/meteor'
import { composeWithTracker } from 'react-komposer'
import { Counts } from 'meteor/tmeasday:publish-counts'
import convertSortStringToObject from '@utils/convert_sort_object'
import convertFormObjectToFilterObject, { RANGE } from '@utils/convert_filter_object'
import Loading from '@components/Loading'
import Users from '@collections/users'

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

  const handler = Meteor.subscribe('users', {
    searchText,
    limit,
    skip,
    filter: filterObject,
    sort: sortObject,
  })


  if (handler.ready()) {
    const totalResults = Counts.get('users.count')
    const selector = {
      'profile.nomeCompleto': new RegExp(searchText, 'i'),
      ...filterObject,
    }

    const options = {
      sort: sortObject,
    }

    const results = Users.find(selector, options).fetch()

    onData(null, {
      results,
      totalResults,
      loadingResults: false,
    })
  }
}

export default searchHOC(composeWithTracker(composer, Loading)(UsersDashboard), {
  searchId: 'users',
})
