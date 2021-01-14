import store from '../../store'
import {
    SET_ACCESS_TOKEN,
    SET_AUTH_TOKEN,
} from '../auth'

/**
 * Set auth token
 *
 * @param {String} token
 * @return {*}
 */
export const setAuthToken = token => {
    store.dispatch({
        type: SET_AUTH_TOKEN,
        token: token,
    })

    return Promise.resolve()
        .then(() => {
            localStorage.setItem('github.token', token)
        })
        .then(() => new Promise(resolve => resolve(token)))
}

/**
 * Set auth token
 *
 * @param {String} token
 * @return {*}
 */
export const setAccessToken = token => {
    store.dispatch({
        type: SET_ACCESS_TOKEN,
        accessToken: token,
    })

    return Promise.resolve()
        .then(() => {
            localStorage.setItem('github.accessToken', token)
        })
        .then(() => new Promise(resolve => resolve(token)))
}
