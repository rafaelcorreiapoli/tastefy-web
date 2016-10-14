import { SimpleSchema } from 'meteor/aldeed:simple-schema'

export const ContatoSchema = new SimpleSchema({
  telefone: {
    type: String,
  },
  celular: {
    type: String,
  },
})

export const EnderecoSchema = new SimpleSchema({
  rua: {
    type: String,
  },
  numero: {
    type: Number,
  },
  complemento: {
    type: String,
  },
})
