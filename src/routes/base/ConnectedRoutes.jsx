import React  from 'react'
import Configurator from '../../configurator'

import {
    BrowserRouter as Router,
    Redirect,
    Route,
} from 'react-router-dom'
import GlobalRoutes from '../global'
import NotFound from '../../components/404'
import { withRouterConnectWrapper } from '../../validator'

class Routes extends Configurator {

    constructor(props) {
        super(props)

        if (this.isIndexHtml()) {
            const locale = this.props.locale || ''
            window.location.href = `${locale}/`
        }
    }

    /**
     * Check if current pathname is /index.html
     * @returns {boolean}
     */
    isIndexHtml = () => {
        const locale = this.props.locale || ''
        return window.location.pathname === `${locale}/index.html`
    }

    /**
     * Returns true, if route is not found in any routes
     * @returns {boolean}
     */
    isRouteNotFound = () => {
        const {
            notFoundRoutes: {
                globalRoutes: notFoundedInGlobal,
            },
        } = this.props

        return notFoundedInGlobal
    }

    /**
     * Render
     *
     * @return {*}
     */
    render = () => {
        const {
            REACT_APP_SYSTEM_NAME: defaultTitle,
            REACT_APP_DEFAULT_DESCRIPTION: defaultDescription,
        } = this.config

        const {
            auth,
            history: {
                location: {
                    pathname,
                }
            }
        } = this.props

        const locale = this.props.locale || ''
        const routeNotFound = this.isRouteNotFound()

        if (!auth.token && !pathname?.includes?.('login')) {
            return (
                <Redirect to="/login" />
            )
        }

        return (
            <Router basename={locale}>
                <GlobalRoutes />

                {routeNotFound && !this.isIndexHtml() && <Route component={NotFound} />}
            </Router>
        )
    }
}

export default withRouterConnectWrapper(state => ({
    auth: state.auth,
    notFoundRoutes: state.notFoundRoutes,
}))(Routes)
