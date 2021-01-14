import './iechecker.js'

if (navigator.userAgent.indexOf('MSIE') !== -1) {
    // eslint-disable-next-line no-console
    console.error = function (message) {
        throw new Error(message)
    }

    // eslint-disable-next-line no-console
    console.error('Unsupported browser')
}

import React from 'react'
import ReactDOM from 'react-dom'

import Root from './router'
import store from './store'
import { Provider } from 'react-redux'

import history from './history'

/** @namespace moment.tz */
const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <Root history={history} />
        </Provider>,
        document.getElementById('app')
    )
}

render()
