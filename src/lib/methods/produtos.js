import { ValidatedMethod } from 'meteor/mdg:validated-method'
import ProdutoSchema from '@schemas/produto'
import Produtos from '@collections/produtos'

export const insert = new ValidatedMethod({
  name: 'Produtos.methods.insert',
  validate: ProdutoSchema.validator(),
  run(data) {
    return Produtos.insert(data)
  },
})
