import { ValidatedMethod } from 'meteor/mdg:validated-method'
import ProdutoSchema from '@schemas/produto'
import Produtos from '@collections/produtos'

export const insert = new ValidatedMethod({
  name: 'Produtos.methods.insert',
  validate: ProdutoSchema.validator(),
  run(data) {
    return Produtos.insert(data)
  },
})

Meteor.methods({
  'Produtos.methods.remove': function remove({ _id }) {
    // if (!Meteor.userId()) throw new Meteor.Error('not-loggedIn')
    // if (!Roles.userIsInRole(Meteor.userId(), 'admin')) throw new Meteor.Error('not-authorized')
    return Produtos.remove(_id)
  },
})
