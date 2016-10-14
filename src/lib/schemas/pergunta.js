import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const WIDGETS = {
  TEXT: 'text',
  CHECKBOX: 'checkbox',
  SELECT: 'select',
  RATING: 'rating',
  SLIDER: 'slider',
  IMAGE_SELECT: 'imageSelect',
};

export const TIPOS = {
  ARRAY: 'array',
  NUMBER: 'number',
  STRING: 'string',
  DATE: 'date',
};

export default new SimpleSchema({
  questionarioId: {
    type: String,
  },
  ordem: {
    type: Number,
    optional: true,
  },
  titulo: {
    type: String,
  },
  tipo: {
    type: String,
  },
  widget: {
    type: String,
  },
  config: {
    type: Object,
    blackbox: true,
  },
});
