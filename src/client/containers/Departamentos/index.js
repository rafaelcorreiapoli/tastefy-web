import searchHOC from '@components/SearchHOC'
import Departamentos from '@components/Departamentos'
import { Meteor } from 'meteor/meteor'
import { composeWithTracker } from 'react-komposer'
import { Counts } from 'meteor/tmeasday:publish-counts'
import convertSortStringToObject from '@utils/convert_sort_object'
import convertFormObjectToFilterObject, { RANGE } from '@utils/convert_filter_object'

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
  const filterObject = convertFormObjectToFilterObject(filter, {
    funcionariosCount: RANGE,
    setoresCount: RANGE,
  })

  const handler = Meteor.subscribe('departamentos', {
    searchText,
    limit,
    skip,
    filter: filterObject,
    sort: sortObject,
  })

  if (handler.ready()) {
    const totalResults = Counts.get('departamentos.count')
    const selector = {
      nome: new RegExp(searchText, 'i'),
      ...filterObject,
    }

    const options = {
      sort: sortObject,
    }
    onData(null, {
      results: [],
      totalResults,
      loading: false,
    })
  }
}
const MyLoading = () => (<div>Hmm...</div>);

export default searchHOC(composeWithTracker(composer, MyLoading)(Departamentos), {
  searchId: 'departamentos',
})
