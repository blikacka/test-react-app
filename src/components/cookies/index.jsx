import React, { Component } from 'react'
import { i18n } from '../../validator'

@i18n()
export default class Cookies extends Component {

    static COOKIE_KEY = 'accept-cookies-dsafa15fds15vc'

    state = {
        userAgreed: true,
    }

    componentDidMount() {
        this.setState({ userAgreed: localStorage.getItem(Cookies.COOKIE_KEY) === 'true' })
    }

    /**
     * Apply cookies to localStorage
     */
    confirmCookies = () => {
        localStorage.setItem(Cookies.COOKIE_KEY, 'true')

        this.setState({ userAgreed: true })
    }

    /**
     * Render
     *
     * @return {null|*}
     */
    render() {
        if (this.state.userAgreed) {
            return null
        }

        const { t } = this.props

        return (
            <div className="Cookies-box__container">
                <div className="Cookies-box__text">
                    {t('cookies.cookiesMessage')}
                </div>

                <button
                    className="btn btn-light btn-sm mx-3"
                    onClick={this.confirmCookies}
                >
                    {t('cookies.agree')}
                </button>
            </div>
        )
    }
}
