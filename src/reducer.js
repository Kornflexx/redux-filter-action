import {
  ADD_HANGING_ACTION,
  REMOVE_HANGING_ACTION,
  CLEAR_HANGING_ACTIONS,
  SET_LAST_ACTION,
  INIT_FILTER
} from './actionTypes'

// utils
const mergeProperty = (state, key, callback) => ({
  ...state,
  [key]: {
    ...(state[key] || {}),
    ...callback(state[key] || {})
  }
})

// action handler
const handleInitFilter = (state, { key }) =>
  mergeProperty(state, key, () => ({
    lastAction: null,
    hangingActions: []
  }))

const handleAddHangingAction = (state, { key, hangingAction }) =>
  mergeProperty(state, key, filter => ({
    hangingActions: [...filter.hangingActions, hangingAction]
  }))

const handleRemoveHangingAction = (state, { key, hangingAction }) =>
  mergeProperty(state, key, filter => ({
    hangingActions: filter.hangingActions.filter(item => item !== hangingAction)
  }))

const handleClearHangingActions = (state, { key }) =>
  mergeProperty(state, key, () => ({
    hangingActions: []
  }))

const handleSetLastAction = (state, { key, lastAction }) =>
  mergeProperty(state, key, () => ({
    lastAction
  }))

// map of action's type to handler
const ACTION_TYPE_HANDLER = {
  [INIT_FILTER]: handleInitFilter,
  [ADD_HANGING_ACTION]: handleAddHangingAction,
  [REMOVE_HANGING_ACTION]: handleRemoveHangingAction,
  [CLEAR_HANGING_ACTIONS]: handleClearHangingActions,
  [SET_LAST_ACTION]: handleSetLastAction
}

const actionFilterReducer = (state = {}, action) => {
  const actionTypeHandler = ACTION_TYPE_HANDLER[action.type]

  if (typeof actionTypeHandler === 'function') {
    const nextState = actionTypeHandler(state, action)
    return nextState
  }

  return state
}

export default actionFilterReducer