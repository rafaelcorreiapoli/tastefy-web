import { ValidatedMethod } from 'meteor/mdg:validated-method'
import RestauranteSchema from '@schemas/restaurante'
import Restaurantes from '@collections/restaurantes'

export const insert = new ValidatedMethod({
  name: 'Restaurantes.methods.insert',
  validate: RestauranteSchema.validator(),
  run(data) {
    return Restaurantes.insert(data)
  },
})
