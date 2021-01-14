import { Component } from 'react'

import { withRouterConnectWrapper } from '../../validator'
import {
    setNotFoundInRoutesAction,
    clearNotFoundInRoutesAction,
} from '../../reducers/actions/not-found-routes'

class NotFoundRoute extends Component {

    /**
     *
     * @param {Object} props
     */
    constructor(props) {
        super(props)

        const {
            routesType,
        } = props

        setNotFoundInRoutesAction(routesType)
    }

    /**
     * After change pathname clear not found params in store
     * @param {Object} prevProps
     */
    componentDidUpdate = prevProps => {
        const {
            location: {
                pathname: prevPathname,
            },
        } = prevProps

        const {
            location: {
                pathname,
            },
        } = this.props

        if (prevPathname !== pathname) {
            clearNotFoundInRoutesAction()
        }
    }

    /**
     * Render
     *
     * @return {*}
     */
    render() {
        return null
    }
}

export default withRouterConnectWrapper(state => ({
    notFoundRoutes: state.notFoundRoutes,
}))(NotFoundRoute)
