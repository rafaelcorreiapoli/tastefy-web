import { Map } from 'immutable'

const PUSH_FILE = 'uploader/PUSH_FILE'
const REMOVE_FILE = 'uploader/REMOVE_FILE'
const ABORT_UPLOAD = 'uploader/ABORT_UPLOAD'
const SET_PROGRESS = 'uploader/SET_PROGRESS'
const SET_STATUS = 'uploader/SET_STATUS'
const SET_ID = 'uploader/SET_ID'

export const STATUS_UPLOADING = 'UPLOADING'
export const STATUS_ABORTED = 'CANCELLED'
export const STATUS_ERROR = 'ERROR'
export const STATUS_SUCCESS = 'SUCCESS'
export const STATUS_PAUSED = 'PAUSED'

export const selectFilesFromUploader = (state, uploaderId) =>
  state.uploader.getIn([uploaderId, 'files']) || Map()

export const pushFile = (uploaderId, fileId, name, preview) => ({
  type: PUSH_FILE,
  payload: {
    uploaderId,
    fileId,
    name,
    preview,
  },
})

export const cancelUpload = (uploaderId, fileId) => ({
  type: ABORT_UPLOAD,
  payload: {
    uploaderId,
    fileId,
  },
})

export const removeFile = (uploaderId, fileId) => ({
  type: REMOVE_FILE,
  payload: {
    uploaderId,
    fileId,
  },
})

export const setProgress = (uploaderId, fileId, progress) => ({
  type: SET_PROGRESS,
  payload: {
    uploaderId,
    fileId,
    progress,
  },
})

export const setStatus = (uploaderId, fileId, status) => ({
  type: SET_STATUS,
  payload: {
    uploaderId,
    fileId,
    status,
  },
})

export const setId = (uploaderId, fileId, _id) => ({
  type: SET_ID,
  payload: {
    uploaderId,
    fileId,
    _id,
  },
})

const initialState = Map()

export default (state = initialState, action) => {
  switch (action.type) {
    case PUSH_FILE:
      const newFile = {
        name: action.payload.name,
        progress: 0,
        status: STATUS_UPLOADING,
        preview: action.payload.preview,
      }
      return state.setIn([action.payload.uploaderId, 'files', action.payload.fileId], Map(newFile))
    case ABORT_UPLOAD:
      return state.setIn([action.payload.uploaderId, 'files', action.payload.fileId, 'status'],
        STATUS_ABORTED)
    case SET_STATUS:
      return state.setIn([action.payload.uploaderId, 'files', action.payload.fileId, 'status'],
        action.payload.status)
    case SET_PROGRESS:
      return state.setIn([action.payload.uploaderId, 'files', action.payload.fileId, 'progress'],
        action.payload.progress)
    case REMOVE_FILE:
      return state.deleteIn([action.payload.uploaderId, 'files', action.payload.fileId])
    case SET_ID:
      return state.setIn([action.payload.uploaderId, 'files', action.payload.fileId, '_id'],
        action.payload._id)
    default:
      return state
  }
}
