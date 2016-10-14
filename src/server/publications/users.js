import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

Meteor.publish('users', () => {
  return Meteor.users.find()
})


Meteor.publishComposite('users.porRestaurante', ({ restauranteId }) => {
  check(restauranteId, String)
  return {
    find() {
      return Meteor.users.find({
        restauranteId,
      })
    },
  }
})
