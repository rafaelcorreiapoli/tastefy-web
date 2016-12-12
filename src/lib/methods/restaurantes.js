import { ValidatedMethod } from 'meteor/mdg:validated-method'
import RestauranteSchema from '@schemas/restaurante'
import Restaurantes from '@collections/restaurantes'
import { Meteor } from 'meteor/meteor'

export const insert = new ValidatedMethod({
  name: 'Restaurantes.methods.insert',
  validate: RestauranteSchema.validator(),
  run(data) {
    return Restaurantes.insert(data)
  },
})

Meteor.methods({
  'Restaurantes.methods.remove': function remove({ _id }) {
    // if (!Meteor.userId()) throw new Meteor.Error('not-loggedIn')
    // if (!Roles.userIsInRole(Meteor.userId(), 'admin')) throw new Meteor.Error('not-authorized')
    return Restaurantes.remove(_id)
  },
})
