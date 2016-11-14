import { ValidatedMethod } from 'meteor/mdg:validated-method';
import PromocaoSchema from '@schemas/promocao';
import Promocoes from '@collections/promocoes';

export const insert = new ValidatedMethod({
  name: 'Promocoes.methods.insert',
  validate: PromocaoSchema.validator(),
  run(data) {
    return Promocoes.insert(data);
  },
});

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
