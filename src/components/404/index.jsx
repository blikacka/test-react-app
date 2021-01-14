import React, { Component } from 'react'
import i18n from '../../locales/i18n'

export default class NotFound extends Component {
    /**
     * Render
     *
     * @return {*}
     */
    render() {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center flex-1 text-center px-1 py-5">
                <a href="/" className="btn btn-outline-success">
                    <span>{i18n.t('notFoundScreen.title')} -></span>
                </a>
            </div>
        )
    }
}
