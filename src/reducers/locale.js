export const SET_LOCALE_LANG = 'SET_LOCALE_LANG'

/**
 * Set locale language
 *
 * @param {Object} state
 * @param {String} lang
 * @return {{lang: *}}
 */
function setLocaleLang(state, lang) {
    return {
        ...state,
        lang: lang,
    }
}

/**
 * Reducer for locale
 * @param {Object} state
 * @param {Object} action
 * @returns {*}
 */
export default function reducer(state = [], action) {
    switch(action.type) {
        case SET_LOCALE_LANG: return setLocaleLang(state, action.locale)
        default: return state
    }
}
