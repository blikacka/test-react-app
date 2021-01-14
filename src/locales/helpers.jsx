/**
 * Get locale file based on lang and namespace
 *
 * @param {String} lang
 * @param {array} namespaces
 * @return {[]}
 */
export function getLocales(lang, namespaces = []) {
    let result = []

    if (namespaces && namespaces instanceof Array) {
        for (let namespaceId in namespaces) {
            let fileKey = namespaces[namespaceId]
            result[fileKey] = require(`./${lang}/generated/${fileKey}.json`)
        }
    } else {
        result = { 'common': require(`./${lang}/generated/common.json`) }
    }

    return result
}
