import store from '../../store'
import {
    SET_NOT_FOUND_IN_ROUTES,
    CLEAR_NOT_FOUND_IN_ROUTES,
} from '../not-found-routes'

/**
 * Set not found in routes in store
 * @param {string} routes
 */
export const setNotFoundInRoutesAction = routes => {
    store.dispatch({
        type: SET_NOT_FOUND_IN_ROUTES,
        routes: routes,
    })
}

/**
 * Clear not found in routes in store
 */
export const clearNotFoundInRoutesAction = () => {
    store.dispatch({
        type: CLEAR_NOT_FOUND_IN_ROUTES,
    })
}
