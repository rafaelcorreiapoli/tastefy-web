import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import Restaurantes from '@collections/restaurantes'

Meteor.publish('restaurantes', () => {
  return Restaurantes.find()
})


Meteor.publish('restaurantes.single', ({ id }) => {
  check(id, String)
  return Restaurantes.find({
    _id: id,
  })
})
