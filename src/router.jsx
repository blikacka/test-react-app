import React from 'react'
import 'babel-polyfill'

import PropTypes from 'prop-types'
import preflight from './preflight'
import { ConnectedRouter } from 'connected-react-router'
import LangRouter from './routes/base/LangRouter'

preflight()

/**
 * Renders base component
 * @param {Object} props
 * @returns {JSX.Element}
 * @constructor
 */
const Root = props => (
    <ConnectedRouter history={props.history}>
        <LangRouter />
    </ConnectedRouter>
)

Root.propTypes = {
    history: PropTypes.object,
}

export default Root
