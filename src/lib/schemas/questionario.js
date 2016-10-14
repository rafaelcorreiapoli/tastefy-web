import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const QuestionarioRespondidoSchema = new SimpleSchema({
  userId: {
    type: String,
  },
  promocaoId: {
    type: String,
  },
  data: {
    type: String,
  },
});

export default new SimpleSchema({
  nome: {
    type: String,
  },
  restauranteId: {
    type: String,
  },
  responderam: {
    type: [QuestionarioRespondidoSchema],
    optional: true,
  },
  tempoMedio: {
    type: Number,
    optional: true,
  },
  ativo: {
    type: Boolean,
    optional: true,
    defaultValue: false,
  },
});
