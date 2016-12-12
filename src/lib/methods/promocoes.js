import { ValidatedMethod } from 'meteor/mdg:validated-method'
import PromocaoSchema from '@schemas/promocao'
import Promocoes from '@collections/promocoes'

export const insert = new ValidatedMethod({
  name: 'Promocoes.methods.insert',
  validate: PromocaoSchema.validator(),
  run(data) {
    return Promocoes.insert(data)
  },
})

export const toggleAtiva = new ValidatedMethod({
  name: 'promocoes.toggleAtiva',
  validate({ promocaoId }) {
    check(promocaoId, String)
  },
  run({ promocaoId }) {
    const promocao = Promocoes.findOne(promocaoId)
    return Promocoes.update({
      _id: promocaoId,
    }, {
      $set: {
        ativa: !promocao.ativa,
      },
    })
  },
})


Meteor.methods({
  'Promocoes.methods.remove': function remove({ _id }) {
    // if (!Meteor.userId()) throw new Meteor.Error('not-loggedIn')
    // if (!Roles.userIsInRole(Meteor.userId(), 'admin')) throw new Meteor.Error('not-authorized')
    return Promocoes.remove(_id)
  },

  'Promocoes.methods.update': function update({ _id, doc }) {
  // if (!Meteor.userId()) throw new Meteor.Error('not-loggedIn')
  // if (!Roles.userIsInRole(Meteor.userId(), 'admin')) throw new Meteor.Error('not-authorized')

    return Promocoes.update(_id, {
      $set: {
        ...doc,
      },
    })
  },
})
