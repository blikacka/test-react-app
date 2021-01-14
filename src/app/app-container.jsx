import React, { Fragment } from 'react'
import Cookies from '../components/cookies'
import { withRouterConnectWrapper } from '../validator'
import Configurator from '../configurator'
import Navbar from './navbar'

class AppContainer extends Configurator {

    /**
     * Render
     */
    render() {
        const {
            children,
        } = this.props

        return (
            <Fragment>
                <Navbar />

                <div className="d-flex flex-column flex-fill min-h-65vh">
                    {React.Children.map(children, child => (
                        React.cloneElement(child, { ...this.state })
                    ))}
                </div>

                <Cookies />
            </Fragment>
        )
    }
}

export default withRouterConnectWrapper(state => ({
    ...state,
}))(AppContainer)
