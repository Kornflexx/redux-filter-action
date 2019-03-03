import deepEqual from 'fast-deep-equal'
import {
  setLastAction,
  initFilter,
  addHangingAction,
  removeHangingAction
} from './actionTypes'

const DEFAULT_FILTER_KEY = 'default'
const DEFAULT_KEY = 'actionFilter'

const makeIsConcerned = (types = []) => action => types.indexOf(action.type) !== -1

const makeIsAllowed = isComparable => ({ lastAction, hangingActions }, action) => {
  const comparableAction = hangingActions.find(hangingAction => isComparable(action, hangingAction))
  const sameAsLastAction = lastAction && isComparable(lastAction, action)
  return comparableAction === undefined && !sameAsLastAction
}

const createActionFilterMiddleware = (types, options = {}) => {

  let initialized = false
  const {
    isConcerned = makeIsConcerned(types),
    isComparable = deepEqual,
    rejectDuration = -1,
    onReject,
    filterKey = DEFAULT_FILTER_KEY,
    key = DEFAULT_KEY
  } = options

  const isAllowed = makeIsAllowed(isComparable)

  return ({ getState }) => {

    const getFilterState = () => {
      const state = getState()
  
      if (!state[key]) {
        throw `Missing store key: ${key}`
      }
  
      const filterState = state[key][filterKey]
      if (!filterState) {
        throw `Missing filter key: ${filterKey}`
      }

      return filterState
    } 

    return next => action => {
      if (!initialized) {
        initialized = true
        next(initFilter(filterKey))
      }

      const concerned = isConcerned(action)
      if (!concerned) {
        next(setLastAction(filterKey, action))
        return next(action)
      }

      const filterState = getFilterState()
      const allowed = isAllowed(filterState, action)
      next(setLastAction(filterKey, action))
      if (allowed) {
        return next(action)
      }

      if (typeof onReject === 'function') {
        onReject(action)
      }

      if (rejectDuration > -1) {
        setTimeout(() => {
          next(removeHangingAction(filterKey, action))
        }, rejectDuration)
        next(addHangingAction(filterKey, action))
      }
    }
  }
}

export {
  makeIsAllowed,
  createActionFilterMiddleware
}