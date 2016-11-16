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

Meteor.publishComposite('produtos.quickList', ({ restauranteId }) => {
  check(restauranteId, String)

  return {
    find() {
      return Produtos.find({
        restauranteId,
      }, {
        fields: {
          _id: 1,
          nome: 1,
          imagemUrl: 1,
          restauranteId: 1,
        },
      })
    },
  }
})
