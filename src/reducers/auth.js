export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN'
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN'

/**
 * Set auth token
 *
 * @param {Object} state
 * @param {String} token
 * @return {{token: *}}
 */
function setAuthToken(state, token) {
    return {
        ...state,
        token: token,
    }
}

/**
 * Set access token
 *
 * @param {Object} state
 * @param {String} accessToken
 * @return {{accessToken: *}}
 */
function setAccessToken(state, accessToken) {
    return {
        ...state,
        accessToken: accessToken,
    }
}

/**
 * Reducer for auth
 * @param {Object} state
 * @param {Object} action
 * @returns {*}
 */
export default function reducer(state = [], action) {
    switch(action.type) {
        case SET_AUTH_TOKEN: return setAuthToken(state, action.token)
        case SET_ACCESS_TOKEN: return setAccessToken(state, action.accessToken)
        default: return state
    }
}
