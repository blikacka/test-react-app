import React, { Component } from 'react'
import i18n from '../locales/i18n'
import {
    i18nWrapper,
    withConnectWrapper,
} from '../validator'

class Navbar extends Component {

    /**
     * Do logout
     */
    logout = () => {
        localStorage.removeItem('github.token')
        localStorage.removeItem('github.accessToken')
        window.location.reload()
    }

    /**
     * Navbar
     *
     * @return {*}
     */
    render() {
        const {
            t,
            auth,
        } = this.props

        return (
            <div className="w-100 nav-base d-flex align-items-center px-3 flex-row justify-content-between border-bottom">
                <div className="d-flex flex-row">
                    <a href="/cs" onClick={() => i18n.changeLanguage('cs')}>CZ</a>
                    <div className="mx-2">|</div>
                    <a href="/en" onClick={() => i18n.changeLanguage('en')}>EN</a>
                </div>
                <div>
                    {auth.token && (
                        <div onClick={this.logout} className="cursor-pointer-opacity">
                            {t('logout')}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default withConnectWrapper(state => ({
    auth: state.auth,
}))(i18nWrapper(Navbar))
