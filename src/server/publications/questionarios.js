import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import Questionarios from '@collections/questionarios'
import Perguntas from '@collections/perguntas'

Meteor.publish('questionarios', () => {
  return Questionarios.find()
})


Meteor.publish('questionarios.porRestaurante', ({ restauranteId }) => {
  check(restauranteId, String)
  return Questionarios.find({
    restauranteId,
  })
})


Meteor.publishComposite('questionarios.single', ({ questionarioId }) => {
  check(questionarioId, String)
  return {
    find() {
      return Questionarios.find({
        _id: questionarioId,
      })
    },
    children: [{
      find(questionario) {
        const { _id } = questionario
        return Perguntas.find({
          questionarioId: _id,
        })
      },
    }],
  }
})
