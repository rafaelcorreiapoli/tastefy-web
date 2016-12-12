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
import { connect } from 'react-redux'
import { openModal, closeModal } from '@ducks/deleteEntity'
import Alert from 'react-s-alert'
import { call } from '@ducks/methods'

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

const mapDispatchToProps = dispatch => ({
  askToDelete(id, entityId, msg) {
    dispatch(openModal(id, entityId, msg))
  },
  deleteEntity(_id, modalId) {
    dispatch(call('Restaurantes.methods.remove', { _id }))
    .then((res) => {
      Alert.success('sucesso')
      dispatch(closeModal(modalId))
    })
    .catch((err) => {
      Alert.error(err.toString())
      dispatch(closeModal(modalId))
    })
  },
})

export default searchHOC(composeWithTracker(composer, Loading)(withLinks(connect(null, mapDispatchToProps)(RestaurantesDashboard))), {
  searchId: 'restaurantes',
})
