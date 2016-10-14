import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { check } from 'meteor/check'
import QuestionarioSchema from '@schemas/questionario'
import PerguntaSchema from '@schemas/pergunta'
import Questionarios from '@collections/questionarios'
import Perguntas from '@collections/perguntas'

export const insert = new ValidatedMethod({
  name: 'questionarios.insert',
  validate({ questionario, perguntas }) {
    check(questionario, QuestionarioSchema)
    check(perguntas, [PerguntaSchema.pick(['titulo', 'tipo', 'config', 'widget'])])
  },
  run({ questionario, perguntas }) {
    const questionarioId = Questionarios.insert(questionario)
    perguntas.forEach((pergunta) => {
      Perguntas.insert({
        questionarioId,
        ...pergunta,
      })
    })
  },
})

export const setAtivo = new ValidatedMethod({
  name: 'questionarios.toggleAtiva',
  validate({ questionarioId }) {
    check(questionarioId, String)
  },
  run({ questionarioId }) {
    Questionarios.update({
      _id: { $ne: questionarioId },
      ativo: true,
    }, {
      $set: {
        ativo: false,
      },
    }, {
      multi: true,
    })

    return Questionarios.update({
      _id: questionarioId,
    }, {
      $set: {
        ativo: true,
      },
    })
  },
})
