/**
 * Returns url query parameter.
 * USAGE: getUrlParameter('lorem')
 *
 * @param {string} name
 * @param props - additional search in location props?
 * @returns {*}
 */
export const getUrlParameter = (name, props = null) => {
    if (props && props.match.location && props.match.location.query) {
        return props.match.location.query[name] || null
    }
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]')
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
    let results = regex.exec(window.location.search)
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '))
}
