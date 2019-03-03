
export const ADD_HANGING_ACTION = '@RA-FILTER/ADD_HANGING_ACTION'
export const REMOVE_HANGING_ACTION = '@RA-FILTER/REMOVE_HANGING_ACTION'
export const CLEAR_HANGING_ACTIONS = '@RA-FILTER/CLEAR_HANGING_ACTIONS'
export const SET_LAST_ACTION = '@RA-FILTER/SET_LAST_ACTION'
export const INIT_FILTER = '@RA-FILTER/INIT_FILTER'

export const addHangingAction = (key, hangingAction) => ({
  type: ADD_HANGING_ACTION,
  hangingAction,
  key
})

export const removeHangingAction = (key, hangingAction) => ({
  type: REMOVE_HANGING_ACTION,
  hangingAction,
  key
})

export const clearHangingActions = (key) => ({
  type: CLEAR_HANGING_ACTIONS,
  key
})

export const setLastAction = (key, lastAction) => ({
  type: SET_LAST_ACTION,
  lastAction,
  key
})

export const initFilter = key => ({
  type: INIT_FILTER,
  key
})
