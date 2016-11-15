import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export default new SimpleSchema({
  restauranteId: {
    type: String,
  },
  questionarioId: {
    type: String,
    optional: true,
  },
  nome: {
    type: String,
  },
  validoAte: {
    type: Date,
  },
  descricao: {
    type: String,
  },
  imagemUrl: {
    type: String,
  },
  ativa: {
    type: Boolean,
    optional: true,
    defaultValue: false,
  },
  produtosId: {
    type: [String],
    optional: true,
  },
})
