import React, {
    Component,
    Suspense,
} from 'react'
import {
    Route,
    Switch,
} from 'react-router-dom'
import NotFoundRoute from './shared/not-found-route'
import { withRouter } from '../validator'
import AppContainer from '../app/app-container'
import Index from '../app/index'
import Login from '../components/login/login'

@withRouter()
export default class GlobalRoutes extends Component {

    /**
     * Render
     *
     * @return {*}
     */
    render = () => (
        <Suspense fallback={<span />}>
            <Switch>
                <Route exact path={'/login'} render={() => <AppContainer><Login {...this.props} /></AppContainer>} />
                <Route exact path={'/'} render={() => <AppContainer><Index {...this.props} /></AppContainer>} />
                <Route exact path={'/:user'} render={() => <AppContainer><Index {...this.props} /></AppContainer>} />
                <Route exact path={'/:user/:tab'} render={() => <AppContainer><Index {...this.props} /></AppContainer>} />

                <NotFoundRoute routesType="globalRoutes" />
            </Switch>
        </Suspense>
    )
}
