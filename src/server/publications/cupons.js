import { Meteor } from 'meteor/meteor';
import { Cupons } from '../cupons';
import { Restaurantes } from '/imports/api/restaurantes/restaurantes';
import { Promocoes } from '/imports/api/promocoes/promocoes';
import { Produtos } from '/imports/api/produtos/produtos';
import { Questionarios } from '/imports/api/questionarios/questionarios';
import { Perguntas } from '/imports/api/perguntas/perguntas';
import { check } from 'meteor/check';

Meteor.publish('cupons', () => {
  return Cupons.find();
});

Meteor.publishComposite('cupons.prePesquisa', function ({ cupomId }) {
  check(cupomId, String);
  const userId = this.userId
  return {
    find() {
      return Cupons.find({
        _id: cupomId,
        ownerId: userId,
      });
    },
    children: [
      {
        find(cupom) {
          return Questionarios.find({
            _id: cupom.questionarioId,
          })
        },
      },
      {
        find(cupom) {
          return Restaurantes.find({
            _id: cupom.restauranteId,
          })
        },
      },
      {
        find(cupom) {
          return Promocoes.find({
            _id: cupom.promocaoId,
          })
        },
        children: [
          {
            find(promocao) {
              return Produtos.find({
                promocaoId: promocao._id,
              })
            },
          },
        ],
      },
    ],
  };
});

Meteor.publishComposite('cupons.pesquisa', function ({ cupomId }) {
  check(cupomId, String);
  const userId = this.userId
  return {
    find() {
      return Cupons.find({
        _id: cupomId,
        ownerId: userId,
      });
    },
    children: [
      {
        find(cupom) {
          return Questionarios.find({
            _id: cupom.questionarioId,
          })
        },
        children: [{
          find(questionario) {
            return Perguntas.find({
              questionarioId: questionario._id,
            })
          },
        }],
      },
    ],
  };
});

Meteor.publishComposite('cupons.porRestaurante', ({ restauranteId }) => {
  check(restauranteId, String);
  return {
    find() {
      return Cupons.find({
        restauranteId,
      });
    },
  };
});

Meteor.publishComposite('cupons.meusCupons', function () {
  const userId = this.userId
  return {
    find() {
      return Cupons.find({
        ownerId: userId,
      });
    },
    children: [{
      find(cupom) {
        return Restaurantes.find({
          _id: cupom.restauranteId,
        }, {
          fields: {
            nome: 1,
            logoUrl: 1,
          },
        })
      },
    }],
  };
});

Meteor.publishComposite('cupons.cuponsGerados', function () {
  const userId = this.userId
  return {
    find() {
      return Cupons.find({
        geradoPor: userId,
      });
    },
  };
});


Meteor.publishComposite('cupons.single', ({ cupomId }) => {
  check(cupomId, String);
  return {
    find() {
      return Cupons.find({
        _id: cupomId,
      });
    },
    children: [{
      find(cupom) {
        const { restauranteId } = cupom;
        return Restaurantes.find({
          _id: restauranteId,
        }, {
          fields: {
            nome: 1,
            logoUrl: 1,
          },
        });
      },
    }],
  };
});
