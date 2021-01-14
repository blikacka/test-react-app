import { Component } from 'react'

/**
 * Load configurations into config component
 */
export default class Configurator extends Component {
    config = {}
    axios = window.axios

    constructor(props) {
        super(props)

        const languageCode = this.languageCode() ? `/${this.languageCode()}/` : '/'

        this.config = {
            ...window.APP_CONFIG,
            windowWidth: window.innerWidth || window.outerWidth,
            locationSearch: window.location.search,
            locationHash: window.location.hash,
            navigator: window.navigator,
            languageCode: languageCode,
        }
    }

    /**
     * Get current window scroll Y
     *
     * @return {int}
     */
    getScrollY = () => window.scrollY

    /**
     * Get current window scroll X
     *
     * @return {int}
     */
    getScrollX = () => window.scrollX

    /**
     * Get current scroll offset Y
     *
     * @return {int}
     */
    getOffsetY = () => window.innerHeight + window.scrollY

    /**
     * Get document height
     *
     * @return {number}
     */
    getDocHeight = () => Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
    )

    /**
     * Check if scrolling is on end of page
     *
     * @return {boolean}
     */
    isEndOfPage = () => this.getOffsetY() >= this.getDocHeight()

    /**
     * Check if scrolling is on bottom page - page offset
     *
     * @param {number} offsetHeight
     * @return {boolean}
     */
    isEndOfPageOffsetted = (offsetHeight = 0) => this.getOffsetY() >= (this.getDocHeight() - offsetHeight)

    /**
     * Reload page
     *
     * @return {*}
     */
    reload = () => window.location.reload()

    /**
     * Scroll to top of page
     *
     * @return {*}
     */
    scrollTop = () => window.scrollTo(0, 0)

    /**
     * Get language code
     *
     * @returns {string}
     */
    languageCode = () => window.location.pathname.substring(1, 3)

    /**
     * Get full language path
     *
     * @param {boolean} startSeparator
     * @param {boolean} endSeparator
     * @returns {string}
     */
    languagePath = (startSeparator = false, endSeparator = false) => (
        this.languageCode() ? `${startSeparator ? '/' : ''}${this.languageCode()}${endSeparator ? '/' : ''}` : ''
    )
}
