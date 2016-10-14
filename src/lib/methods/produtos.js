import { ValidatedMethod } from 'meteor/mdg:validated-method';
import ProdutoSchema from '@shemas/produto';
import Produtos from '@collections/produtos';

export const insert = new ValidatedMethod({
  name: 'produtos.insert',
  validate: ProdutoSchema.validator(),
  run(data) {
    return Produtos.insert(data);
  },
});
