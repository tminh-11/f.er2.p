export const formInitialState = { newName: '', validated: false, nameError: null }
export function roomTypeFormReducer(state, action) {
  switch (action.type) {
    case 'SET_NAME': return { ...state, newName: action.payload, nameError: null }
    case 'SET_VALIDATED': return { ...state, validated: action.payload }
    case 'SET_ERROR': return { ...state, nameError: action.payload }
    case 'BLUR': return action.isValid ? { ...state, validated: false } : state
    case 'RESET': return formInitialState
    default: return state
  }
}
export const editInitialState = { editingId: null, editValue: '', editError: null }
export function editReducer(state, action) {
  switch (action.type) {
    case 'START': return { editingId: action.id, editValue: action.name, editError: null }
    case 'SET_VALUE': return { ...state, editValue: action.payload, editError: null }
    case 'BLUR': return { ...state, editError: action.error }
    case 'SET_ERROR': return { ...state, editError: action.payload }
    case 'CANCEL': return editInitialState
    default: return state
  }
}
