import React from 'react'
import Configurator from '../../configurator'
import isIn from 'validator/lib/isIn'
import {
    AVAILABLE_LANGUAGES,
    DEFAULT_LANGUAGE_CODE,
} from '../../consts'
import i18n from '../../locales/i18n'
import store from '../../store'
import { SET_LOCALE_LANG } from '../../reducers/locale'
import {
    Redirect,
    Route,
    Switch,
} from 'react-router-dom'
import ConnectedRoutes from './ConnectedRoutes'

/**
 * Maps available languages to url format
 * @returns {string[]}
 */
const mapAvailableLanguages = () => AVAILABLE_LANGUAGES.map(availableLanguage => `/${availableLanguage}/`)

/**
 * LangRouter class for language switching
 */
class LangRouter extends Configurator {

    /**
     * Gets called on component mounting
     */
    componentDidMount() {
        const pathname = window.location.pathname
        const languageCode = this.languageCode()
        const languagePathname = pathname.substring(0, 4)
        const availableLanguages = mapAvailableLanguages()

        // If language is not defined or language code is not supported
        if (!isIn(languagePathname, availableLanguages)) {

            // If some language code is not supported, redirect to right language
            if (pathname.substring(0, 1) === '/' && pathname.substring(3, 4) === '/') {
                window.location.href = window.location.href.replace(languagePathname, `/${DEFAULT_LANGUAGE_CODE}/`)
                return
            }

            // Redirect to language with keeping original path
            window.location.href = window.location.href.replace(window.location.origin, `${window.location.origin}/${DEFAULT_LANGUAGE_CODE}`)
            return
        }

        i18n.changeLanguage(languageCode)

        store.dispatch({
            type: SET_LOCALE_LANG,
            lang: languageCode,
        })
    }

    /**
     * Renders base component
     */
    render() {
        return (
            <Switch>
                {AVAILABLE_LANGUAGES.map(language => (
                    <Route key={language} path={`/${language}/*`} exact render={() => <ConnectedRoutes locale={`/${language}`} />}/>
                ))}
                <Route path="/" exact render={() => <Redirect to={`/${DEFAULT_LANGUAGE_CODE}/`} />} />
            </Switch>
        )
    }
}

export default LangRouter
