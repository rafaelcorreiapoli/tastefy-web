import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export default new SimpleSchema({
  // Para qual restaurante
  restauranteId: {
    type: String,
  },
  // Quem é o dono ?
  ownerId: {
    type: String,
  },
  // Para qual promoção serve
  promocaoId: {
    type: String,
  },
  // Qual foi o produto escolhido no momento que foi utilizado
  produtoId: {
    type: String,
    optional: true,
  },
  // Qual questionário foi respondido para sua obtenção
  questionarioId: {
    type: String,
  },
  // Foi gerado nesta data
  geradoEm: {
    type: Date,
  },
  // Quando  utilizado, foi nesta data
  utilizadoEm: {
    type: Date,
    optional: true,
  },
  // É valido até esta data
  validoAte: {
    type: Date,
  },
  // Já foi utilizado?
  utilizado: {
    type: Boolean,
  },
  token: {
    type: String,
  },
  produtoSelecionado: {
    type: String,
    optional: true,
  },
  validadoPor: {
    type: String,
    optional: true,
  },
});
