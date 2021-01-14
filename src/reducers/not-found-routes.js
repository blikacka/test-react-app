import { DEFAULT_NOT_FOUNDED_ROUTE } from '../store'

export const SET_NOT_FOUND_IN_ROUTES = 'SET_NOT_FOUND_IN_ROUTES'
export const CLEAR_NOT_FOUND_IN_ROUTES = 'CLEAR_NOT_FOUND_IN_ROUTES'

/**
 * Set not found route in store
 * @param {Object} state
 * @param {string} routes
 * @return {Object}
 */
function setNotFounded(state, routes) {
    return {
        ...state,
        [routes]: true,
    }
}

/**
 * Clear (set) all not founded params to false
 * @param {Object} state
 * @return {{frontRoutes: boolean, translatedRoutes: boolean, adminRoutes: boolean, globalRoutes: boolean, superAdminRoutes: boolean}}
 */
function clearNotFounded(state) {
    return {
        ...state,
        ...DEFAULT_NOT_FOUNDED_ROUTE,
    }
}

/**
 * Reducer for error object in store
 * @param {Object} state
 * @param {Object} action
 * @returns {*|{error: *, message: *}|Array}
 */
export default function reducer(state = [], action) {
    switch(action.type) {
        case SET_NOT_FOUND_IN_ROUTES: return setNotFounded(state, action.routes)
        case CLEAR_NOT_FOUND_IN_ROUTES: return clearNotFounded(state)
        default: return state
    }
}
