import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export default new SimpleSchema({
  restauranteId: {
    type: String,
  },
  // promocaoId: {
  //   type: String,
  // },
  nome: {
    type: String,
  },
  imagemUrl: {
    type: String,
  },
  desconto: {
    type: Number,
    decimal: true,
  },
  observacao: {
    type: String,
    optional: true,
  },
});
