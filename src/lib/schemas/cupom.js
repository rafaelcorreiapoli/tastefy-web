import { SimpleSchema } from 'meteor/aldeed:simple-schema'

export default new SimpleSchema({
  restauranteId: {
    type: String,
  },
  promocoesId: {
    type: [String],
    optional: true,
  },
  promocaoId: {
    type: String,
  },
  token: {
    type: String,
  },
  geradoEm: {
    type: Date,
  },
  geradoPor: {
    type: String,
  },
  obtidoEm: {
    type: Date,
    optional: true,
  },
  utilizadoEm: {
    type: Date,
    optional: true,
  },
  validoAte: {
    type: Date,
  },
  ownerId: {
    type: String,
    optional: true,
  },
  utilizado: {
    type: Boolean,
  },
  questionarioId: {
    type: String,
  },
})
