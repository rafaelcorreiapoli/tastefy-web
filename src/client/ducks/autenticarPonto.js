import { Map } from 'immutable'

const SET_FOTO = 'autenticarPonto/SET_FOTO'
const SET_UPLOADING = 'autenticarPonto/SET_UPLOADING'
const SET_AUTENTICANDO = 'autenticarPonto/SET_AUTENTICANDO'
const CANCEL = 'autenticarPonto/CANCEL'
const SET_SUCESSO = 'autenticarPonto/SET_SUCESSO'
const SET_ERRO = 'autenticarPonto/SET_ERRO'

export const getCount = state => state.counter.get('count')

export const setFoto = (foto) => ({
  type: SET_FOTO,
  payload: {
    foto,
  },
})

export const setAutenticando = (autenticando) => ({
  type: SET_AUTENTICANDO,
  payload: {
    autenticando,
  },
})

export const setUploading = (uploading) => ({
  type: SET_UPLOADING,
  payload: {
    uploading,
  },
})
export const setErro = (erro) => ({
  type: SET_ERRO,
  payload: {
    erro,
  },
})

export const setSucesso = (sucesso) => ({
  type: SET_SUCESSO,
  payload: {
    sucesso,
  },
})

export const cancel = () => ({
  type: CANCEL,
})


export const iniciarAutenticacao = () => dispatch => {
  dispatch(setAutenticando(true))
  setTimeout(() => {
    dispatch(setSucesso(true))
  }, 2500)
}

export const iniciarUpload = () => dispatch => {
  dispatch(setUploading(true))
  setTimeout(() => {
    dispatch(iniciarAutenticacao())
  }, 5000)
}

const initialState = Map({
  foto: null,
  autenticando: false,
  erro: null,
  sucesso: null,
  uploading: false,
})

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FOTO:
      return state.set('foto', action.payload.foto)
    case SET_AUTENTICANDO:
      return state.set('autenticando', action.payload.autenticando)
        .set('erro', null)
        .set('sucesso', null)
        .set('uploading', false)
    case SET_ERRO:
      return state.set('erro', action.payload.erro)
        .set('sucesso', null)
        .set('autenticando', false)
    case SET_SUCESSO:
      return state.set('sucesso', action.payload.sucesso)
        .set('erro', null)
        .set('autenticando', false)
    case SET_UPLOADING:
      return state.set('uploading', action.payload.uploading)
        .set('sucesso', null)
        .set('erro', null)
        .set('autenticando', false)
    case CANCEL:
      return state.set('autenticando', false)
      .set('foto', null)
      .set('sucesso', null)
      .set('erro', null)
    default:
      return state
  }
}
