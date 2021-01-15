import React from 'react'
import { Redirect } from 'react-router'
import {
    i18n,
    withConnectWrapper,
} from '../../validator'
import Configurator from '../../configurator'

@i18n()
class Login extends Configurator {
    state = {
        logged: false,
    }

    /**
     * Check if user is logged on start
     */
    componentDidMount() {
        if (this.props.auth.token) {
            this.setState({ logged: true })
        }
    }

    /**
     * Render
     *
     * @return {*}
     */
    render() {
        const {
            logged,
        } = this.state

        const {
            REACT_APP_GITHUB_CLIENT_ID: clientId,
        } = this.config

        const {
            t,
        } = this.props

        if (logged) {
            return <Redirect to="/" />
        }

        return (
            <div className="center-center">
                <a href={`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user`} className="btn btn-success">
                    {t('loginButton')}
                </a>
            </div>
        )
    }
}

export default withConnectWrapper(state => ({
    auth: state.auth,
}))(Login)
