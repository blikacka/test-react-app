import {
    createStore,
    applyMiddleware,
    compose,
} from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'

import rootReducer from './reducers/index'

import { createBrowserHistory } from 'history'

/**
 * Returns item from local storage
 * @param {string} key
 * @returns {null|object}
 */
export const getItemFromLocalStorage = key => localStorage.getItem(key) && localStorage.getItem(key) !== 'undefined' ? localStorage.getItem(key) : null

/**
 * Make session storage as async
 *
 * @type {{removeItem: (function(*=): Promise<void>), getItem: (function(*=): Promise<string>), setItem: (function(*=, *=): Promise<void>)}}
 */
export const asyncSessionStorage = {
    setItem: (key, value) => Promise.resolve().then(() => {
        sessionStorage.setItem(key, value)
    }),
    getItem: key => Promise.resolve().then(() => sessionStorage.getItem(key)),
    removeItem: key => Promise.resolve().then(() => sessionStorage.removeItem(key)),
}

export const DEFAULT_NOT_FOUNDED_ROUTE = {
    globalRoutes: false,
}

export const initialState = {
    auth: {
        token: getItemFromLocalStorage('github.token') || null,
        accessToken: getItemFromLocalStorage('github.accessToken') || null,
    },
    users: {
        searchString: null,
        data: [],
        busy: false,
        cursor: 0,
        canLoadMore: true,
        modalOpen: false,
        modalUser: null,
    },
    locale: {
        lang: 'cs',
    },
    notFoundRoutes: {
        ...DEFAULT_NOT_FOUNDED_ROUTE,
    },
}

const history = createBrowserHistory()

const appVersion = window?.APP_CONFIG?.REACT_APP_VERSION
const isDev = appVersion === '@local' || appVersion === '@dev'

const store = createStore(
    rootReducer(history),
    initialState,
    compose(
        applyMiddleware(
            routerMiddleware(history),
            thunk
        ),
        isDev && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : method => (method)
    ),
)

export default store
