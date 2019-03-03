import {
  makeIsAllowed,
  createActionFilterMiddleware
} from './middleware'
import actionFilterReducer from './reducer'
import {
  ADD_HANGING_ACTION,
  REMOVE_HANGING_ACTION,
  CLEAR_HANGING_ACTIONS,
  SET_LAST_ACTION,
  INIT_FILTER,
  addHangingAction,
  removeHangingAction,
  clearHangingActions,
  setLastAction,
  initFilter
} from './actionTypes'

const filterActions = {
  addHangingAction,
  removeHangingAction,
  clearHangingActions,
  setLastAction,
  initFilter
}

const filterTypes = {
  ADD_HANGING_ACTION,
  REMOVE_HANGING_ACTION,
  CLEAR_HANGING_ACTIONS,
  SET_LAST_ACTION,
  INIT_FILTER
}

export {
  createActionFilterMiddleware,
  actionFilterReducer,
  filterActions,
  filterTypes,
  makeIsAllowed
}
