import i18n from 'i18next'
import ReactPostProcessor from 'i18next-react-postprocessor'
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { getLocales } from './helpers'

// namespace (default)
const namespace = 'common'

// countryCodes
const countryCodes = []
countryCodes.cs = 'cs'
countryCodes.en = 'en'

// get resources
const cs = getLocales(countryCodes.cs, namespace)
const en = getLocales(countryCodes.en, namespace)

const resources = {
    cs,
    en,
}

// get i18nextLng form localStorage
const lang = localStorage.getItem('i18nextLng') || navigator.language || ''

// init
i18n
    .use(initReactI18next)
    .use(new ReactPostProcessor())
    .use(I18nextBrowserLanguageDetector)
    .init({
        postProcess: ['reactPostprocessor'],
        interpolation: {
            escapeValue: false,
        },
        withCredentials: false,
        lowerCaseLng: true,
        detection: {
            // order and from where user language should be detected
            order: ['localStorage', 'navigator', 'cookie'],
        },
        whitelist: ['cs', 'en', 'de', 'pl'],
        fallbackLng: {
            'cs': ['cs'],
            'en': ['cs', 'en'],
            'sk': ['cs'],
            'pl': ['cs', 'en'],
            'default': ['en'],
        },
        lng: lang,
        ns: namespace,
        defaultNS: namespace,
        debug: false,
        resources: resources,
    })

export default i18n
