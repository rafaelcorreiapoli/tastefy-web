import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export default new SimpleSchema({
  nome: {
    type: String,
  },
  categoria: {
    type: String,
  },
  lat: {
    type: Number,
    decimal: true,
    optional: true,
  },
  lng: {
    type: Number,
    decimal: true,
    optional: true,
  },
  logoUrl: {
    type: String,
  },
  questionarioId: {
    type: String,
    optional: true,
  },
  backgroundUrl: {
    type: String,
  },
});
