import store from '../../store'

import {
    USERS_MODAL_OPEN,
    USERS_SET_BUSY,
    USERS_SET_DATA,
    USERS_SET_SEARCH_STRING,
} from '../users'

/**
 * Set users search string
 *
 * @param {String} searchString
 * @return {*}
 */
export const setUsersSearchString = searchString => (
    store.dispatch({
        type: USERS_SET_SEARCH_STRING,
        searchString: searchString,
    })
)

/**
 * Set busy
 *
 * @param {boolean} busy
 * @return {*}
 */
export const setUsersBusy = busy => (
    store.dispatch({
        type: USERS_SET_BUSY,
        busy: busy,
    })
)

/**
 * Set data
 *
 * @param {array} data
 * @return {*}
 */
export const setUsersData = data => (
    store.dispatch({
        type: USERS_SET_DATA,
        data: {
            data: data,
        },
    })
)

/**
 * SEt users modal open
 *
 * @param {Object|null} user
 * @return {*}
 */
export const userModalOpen = user => (
    store.dispatch({
        type: USERS_MODAL_OPEN,
        user: user,
    })
)
