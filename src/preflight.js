import React from 'react'
import axios from 'axios'
import { hydrate } from 'react-dom'
import 'url-search-params-polyfill'
import {
    Alert,
    SwConfirm,
} from './components/shared/sweet-alert'

import i18n from './locales/i18n'

const preflight = () => {
    let userLang = window.location.pathname.substring(0, 4).replace('/', '').replace('/', '')

    window.axios = axios

    window.axios.defaults.headers.common = {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Accept-Language': userLang,
    }

    window.axios.interceptors.response.use(null, err => {
        if (err?.response?.status === 429) {
            return window.swalert(i18n.t('serverError.429'))
        }

        if (err?.response?.status === 500) {
            window.swalert(i18n.t('serverError.500'))
        }

        return Promise.reject(err.response)
    })

    /**
     * Call better alerts
     * USAGE = anywhere in code window.swalert('FOO')  OR  window.swalert('FOO', 'success')
     *
     * @param {string} text
     * @param {string|null} type    - types defined in inherit doc - primary|info|success|warning|danger
     * @param {function|null} onConfirm
     * @inheritDoc http://djorg83.github.io/react-bootstrap-sweetalert/
     */
    window.swalert = (text, type = 'danger', onConfirm = null) => hydrate(<Alert title={text} type={type} onConfirm={onConfirm} />, document.getElementById('alert-container'))

    /**
     * Call better confirms
     * USAGE = anywhere in code window.swconfirm({ --params-- })
     * PARAMS -
     *
     * {
     *      title: 'Opravdu chcete smazat tuto položku?',   // required - string
     *      onConfirm: () => deleteGroup(group.slug),       // required - promise
     *      confirmBtnText: 'Ano',                          // optional - string
     *      cancelBtnText: 'Ne',                            // optional - string
     *      afterConfirm: () => loadGroups(),               // optional - promise
     *      type: 'danger',                                 // optional - string
     *  }
     *
     * @param {Object} props
     * @inheritDoc http://djorg83.github.io/react-bootstrap-sweetalert/
     */
    window.swconfirm = props => hydrate(<SwConfirm {...props} />, document.getElementById('alert-container'))
}

export default preflight
