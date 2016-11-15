import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import Produtos from '@collections/produtos'

Meteor.publishComposite('produtos.porRestaurante', ({ restauranteId }) => {
  check(restauranteId, String)
  return {
    find() {
      return Produtos.find({
        restauranteId,
      })
    },
  }
})


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

Meteor.publishComposite('produtos.quickList', () => {
  return {
    find() {
      return Produtos.find({}, {
        fields: {
          _id: 1,
          nome: 1,
          imagemUrl: 1,
        },
      })
    },
  }
})
