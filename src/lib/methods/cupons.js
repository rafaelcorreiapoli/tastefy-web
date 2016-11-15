import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { Match, check } from 'meteor/check'
import { Random } from 'meteor/random'
import moment from 'moment'
import Questionarios from '@collections/questionarios'
import Promocoes from '@collections/promocoes'
import Cupons from '@collections/cupons'
import { Roles } from 'meteor/alanning:roles'

export const insert = new ValidatedMethod({
  name: 'Cupons.methods.insert',
  validate({ restauranteId }) {
    if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      check(restauranteId, String)
    } else if (Roles.userIsInRole(Meteor.userId(), ['restaurante'])) {
      check(restauranteId, Match.Optional(String))
    }
  },
  run({ restauranteId }) {
    let acceptedRestauranteId

    if (Roles.userIsInRole(Meteor.userId(), ['restaurante'])) {
      acceptedRestauranteId = Meteor.user().restauranteId
    } else {
      acceptedRestauranteId = restauranteId
    }

    if (!acceptedRestauranteId) {
      throw new Meteor.Error('cupons.insert.restauranteNotDefined')
    }

    const promocao = Promocoes.findOne({
      restauranteId: acceptedRestauranteId,
      ativa: true,
    }, {
      fields: {
        _id: 1,
      },
    })
    const questionario = Questionarios.findOne({
      restauranteId: acceptedRestauranteId,
      ativo: true,
    }, {
      fields: {
        _id: 1,
      },
    })
    const promocaoId = promocao._id
    const questionarioId = questionario._id
    const geradoPor = Meteor.userId()
    const geradoEm = new Date()
    const token = Random.hexString(10)
    const diasParaVencer = 1 // TODO

    const validoAte = moment(geradoEm).add(diasParaVencer, 'days').toDate()
    const utilizado = false

    const newCupom = {
      restauranteId: acceptedRestauranteId,
      geradoPor,
      promocaoId,
      questionarioId,
      token,
      geradoEm,
      validoAte,
      utilizado,
    }

    const _id = Cupons.insert(newCupom)

    if (_id) {
      Meteor.users.update({
        _id: geradoPor,
      }, {
        $inc: {
          cuponsGerados: 1,
        },
      })
    }
    return {
      _id,
      token,
    }
  },
})

export const claim = new ValidatedMethod({
  name: 'cupons.claim',
  validate({ token }) {
    check(token, String)
  },
  run({ token }) {
    const ownerId = Meteor.userId()
    const data = new Date()

    const cupom = Cupons.findOne({
      token,
    })

    if (!cupom) {
      throw new Meteor.Error('cupons.claim.cupomNaoExiste')
    }
    if (cupom.ownerId) {
      if (cupom.ownerId === ownerId) {
        throw new Meteor.Error('cupons.claim.voceJaEDono')
      } else {
        throw new Meteor.Error('cupons.claim.cupomTemOutroDono')
      }
    }

    const { _id } = cupom

    return Cupons.update({
      _id,
    }, {
      $set: {
        ownerId,
        data,
      },
    })
  },
})
