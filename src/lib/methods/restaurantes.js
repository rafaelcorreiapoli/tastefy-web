import { ValidatedMethod } from 'meteor/mdg:validated-method';
import RestauranteSchema from '@schemas/restaurante';
import Restaurantes from '@collections/restaurantes';

export const insert = new ValidatedMethod({
  name: 'restaurantes.insert',
  validate: RestauranteSchema.validator(),
  run(data) {
    Meteor.isServer && Meteor._sleepForMs(1000)
    return Restaurantes.insert(data);
  },
});
