import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import Promocoes from '@collections/promocoes'
import Questionarios from '@collections/questionarios'
import Restaurantes from '@collections/restaurantes'
import Produtos from '@collections/produtos'


Meteor.publishComposite('promocoes.ativas', () => {
  return {
    find() {
      return Promocoes.find({
        ativa: true,
        validoAte: {
          $gte: new Date(),
        },
      })
    },
    children: [{
      find(promocao) {
        const { restauranteId } = promocao
        return Restaurantes.find({
          _id: restauranteId,
        })
      },
    }],
  }
})

Meteor.publishComposite('promocoes', () => {
  return {
    find() {
      return Promocoes.find()
    },
    children: [{
      find(promocao) {
        const { restauranteId } = promocao
        return Restaurantes.find({
          _id: restauranteId,
        })
      },
    }],
  }
})

Meteor.publishComposite('promocoes.porRestaurante', ({ restauranteId }) => {
  check(restauranteId, String)
  return {
    find() {
      // Find top ten highest scoring posts
      return Restaurantes.find({
        _id: restauranteId,
      }, {
        fields: {
          logoUrl: 1,
        },
      })
    },
    children: [{
      find(restaurante) {
        const { _id } = restaurante
        return Promocoes.find({
          restauranteId: _id,
        })
      },
      children: [{
        find(promocao) {
          const { questionarioId } = promocao
          return Questionarios.find({
            _id: questionarioId,
          })
        },
      }],
    }],
  }
})


Meteor.publishComposite('promocoes.single', ({ promocaoId }) => {
  check(promocaoId, String)
  return {
    find() {
      return Promocoes.find({
        _id: promocaoId,
      })
    },
    children: [{
      find(promocao) {
        return Produtos.find({
          _id: {
            $in: promocao.produtosId,
          },
        })
      },
    }, {
      find(promocao) {
        return Restaurantes.find({
          _id: promocao.restauranteId,
        })
      },
      children: [{
        find(restaurante) {
          return Questionarios.find({
            restauranteId: restaurante._id,
            ativo: true,
          })
        },
      }],
    }],
  }
})
