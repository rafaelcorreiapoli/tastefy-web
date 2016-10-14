import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { TIPOS } from '@schemas/pergunta'
import Respostas from '@collections/respostas'
import Perguntas from '@collections/perguntas'
import Cupons from '@collections/cupons'
import { Random } from 'meteor/random'
import Promocoes from '@collections/promocoes'
import Vouchers from '@collections/vouchers'
import { Match, check } from 'meteor/check'

export const processarRespostas = new ValidatedMethod({
  name: 'respostas.processarRespostas',
  validate({ respostas, cupomId }) {
    check(respostas, [{
      perguntaId: String,
      val: Match.OneOf(Number, [Number], String, [String], Boolean, [Boolean]),
    }])
    check(cupomId, String)
  },
  run({ respostas, cupomId }) {
    const userId = Meteor.userId()
    const data = new Date()

    // Checar cupom
    const cupom = Cupons.findOne({
      _id: cupomId,
      ownerId: userId,
      utilizado: false,
      validoAte: {
        $gte: data,
      },
    })

    if (!cupom) {
      throw new Meteor.Error('respostas.processarRespostas.cupomInvalido')
    }

    const { questionarioId, promocaoId, restauranteId } = cupom


    // Conferir se respondeu tudo que precisava
    const respostasNecessarias = Perguntas.find({
      questionarioId,
    }, {
      fields: {
        _id: 1,
      },
    }).fetch()

    respostasNecessarias.forEach((respostaNecessaria) => {
      const temResposta = respostas.find(r => r.perguntaId === respostaNecessaria._id)
      if (!temResposta) {
        throw new Meteor.Error('respostas.processarRespostas.respostasInsuficientes')
      }
    })

    respostas.forEach((resposta) => {
      const { perguntaId, val } = resposta

      //  Checar se a pergunta realmente existe
      const pergunta = Perguntas.findOne({
        _id: perguntaId,
        questionarioId,
      })

      if (!pergunta) {
        throw new Meteor.Error('respostas.processarRespostas.perguntaNaoEncontrada')
      }

      const { tipo } = pergunta
      //  Transformar val em conteudo de resposta
      let conteudo
      switch (tipo) {
        case (TIPOS.STRING):
          conteudo = {
            string: val,
          }
          break
        case (TIPOS.ARRAY):
          conteudo = {
            array: val,
          }
          break
        case (TIPOS.NUMBER):
          conteudo = {
            number: val,
          }
          break
        case (TIPOS.DATE):
          conteudo = {
            date: val,
          }
          break
        default:
          throw new Meteor.Error('respostas.processarRespostas.tipoDesconhecido')
      }

      //  Gerar objeto de resposta

      const obj = {
        perguntaId,
        questionarioId,
        userId,
        tipo,
        conteudo,
        data,
        promocaoId,
      }

      //  Guardar no banco de dados
      Respostas.insert(obj)
    })

    const { _id } = cupom
    Cupons.update({
      _id,
    }, {
      $set: {
        utilizado: true,
        utilizadoEm: data,
      },
    })


    const promocao = Promocoes.findOne(promocaoId)
    const token = Random.hexString(10)

    Vouchers.insert({
      restauranteId,
      ownerId: userId,
      questionarioId,
      promocaoId,
      geradoEm: data,
      validoAte: promocao.validoAte,
      utilizado: false,
      token,
    })
  },
})
