export const USERS_SET_CURSOR = 'USERS_SET_CURSOR'
export const USERS_SET_DATA = 'USERS_SET_DATA'
export const USERS_MODAL_OPEN = 'USERS_MODAL_OPEN'
export const USERS_SET_BUSY = 'USERS_SET_BUSY'
export const USERS_SET_SEARCH_STRING = 'USERS_SET_SEARCH_STRING'
export const USERS_RESET_SEARCH_DATA = 'USERS_RESET_SEARCH_DATA'

/**
 * Set cursor to store
 *
 * @param {Object} state
 * @param {integer} value
 * @return {*}
 */
function setCursor(state, value) {
    return {
        ...state,
        cursor: state.cursor === null ? null : (typeof value === 'object' && value !== null ? (state.cursor + value.add) : value),
    }
}

/**
 * Set users full data to store
 *
 * @param {Object} state
 * @param {Object} data
 * @return {*}
 */
function usersSetData(state, data) {
    return {
        ...state,
        ...data,
    }
}

/**
 * Set users busy into store
 *
 * @param {Object} state
 * @param {boolean} busy
 * @return {*}
 */
function usersSetBusy(state, busy) {
    return {
        ...state,
        busy: busy,
    }
}

/**
 * Set users busy into store
 *
 * @param {Object} state
 * @param {string} searchString
 * @return {*}
 */
function usersSetSearchString(state, searchString) {
    return {
        ...state,
        searchString: searchString,
    }
}

/**
 * Set users modal open
 *
 * @param {Object} state
 * @param {Object|null} user
 * @return {*}
 */
function usersModalOpen(state, user) {
    return {
        ...state,
        modalOpen: !!user,
        modalUser: user,
    }
}

/**
 * Clear searched data
 *
 * @param {Object} state
 * @return {*}
 */
function usersResetSearchData(state) {
    return {
        ...state,
        data: [],
        canLoadMore: true,
        cursor: 0,
    }
}

/**
 * @param {Object} state
 * @param {Object} action
 * @return {*}
 */
export default function (state = [], action) {
    switch (action.type) {
        case USERS_SET_CURSOR: return setCursor(state, action.cursor)
        case USERS_SET_DATA: return usersSetData(state, action.data)
        case USERS_SET_BUSY: return usersSetBusy(state, action.busy)
        case USERS_SET_SEARCH_STRING: return usersSetSearchString(state, action.searchString)
        case USERS_RESET_SEARCH_DATA: return usersResetSearchData(state)
        case USERS_MODAL_OPEN: return usersModalOpen(state, action.user)
        default: return state
    }
}
