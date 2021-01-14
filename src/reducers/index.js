import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import auth from './auth'
import users from './users'
import notFoundRoutes from './not-found-routes'
import locale from './locale'

export default history => combineReducers({
    auth,
    users,
    notFoundRoutes,
    locale,
    router: connectRouter(history),
})
