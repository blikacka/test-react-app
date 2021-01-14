import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter as withRouterBase } from 'react-router-dom'
import {
    I18nextProvider,
    Translation,
} from 'react-i18next'
import translates from './locales/i18n'

/**
 * Apply global config to class
 * USAGE - @config()    - now will be config applied to class and will be available on props - this.props.config
 *
 * @return {Function}
 */
export function config() {
    return function(Child) {
        class Config extends Component {
            render() {
                return <Child {...this.props} {...this.context} config={window.APP_CONFIG} />
            }
        }

        return Config
    }
}

/**
 * Apply i18n to child
 * USAGE - @i18n()    - now will be translations available in class
 *
 * @return {Function}
 */
export function i18n() {
    return function(Child) {
        class I18N extends Component {
            render() {
                return (
                    <I18nextProvider i18n={translates}>
                        <Translation>
                            {t => <Child t={t} {...this.props} {...this.context} />}
                        </Translation>
                    </I18nextProvider>
                )
            }
        }

        return I18N
    }
}

/**
 * Make i18n wrapper for usage as export
 * USAGE - export default i18nWrapper(Class)
 *
 * @param {*} Child
 * @return {*}
 */
export function i18nWrapper(Child) {
    return class extends Component {
        render() {
            return (
                <I18nextProvider i18n={translates}>
                    <Translation>
                        {t => <Child t={t} {...this.props} {...this.context} />}
                    </Translation>
                </I18nextProvider>
            )
        }
    }
}

/**
 * Replace base redux connect by connect with router applied
 * USAGE - export default withRouterConnectWrapper(state => { foo: state.bar })(Class)
 *
 * @param {Function} mapStateToProps
 * @param {Function|null} mapDispatchToProps
 * @return {Function}
 */
export function withRouterConnectWrapper(mapStateToProps, mapDispatchToProps = null) {
    return function(WrappedComponent) {
        return withRouterBase(connect(mapStateToProps, mapDispatchToProps)(WrappedComponent))
    }
}

/**
 * Replace base redux connect by simple connect
 * USAGE - export default withConnectWrapper(state => { foo: state.bar })(Class)
 *
 * @param {Function} mapStateToProps
 * @param {Function|null} mapDispatchToProps
 * @return {Function}
 */
export function withConnectWrapper(mapStateToProps, mapDispatchToProps = null) {
    return function(WrappedComponent) {
        return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
    }
}

/**
 * Apply with router to class
 * USAGE - @withRouter()    - now will be withRouter inside function
 *
 * @return {Function}
 */
export function withRouter() {
    return function(Child) {
        class Class extends Component {
            render = () => <Child {...this.props} {...this.context} />
        }

        return withRouterBase(Class)
    }
}
