import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import Produtos from '@collections/produtos'

Meteor.publishComposite('produtos.porPromocao', ({ promocaoId }) => {
  check(promocaoId, String)
  return {
    find() {
      return Produtos.find({
        promocaoId,
      })
    },
  }
})
