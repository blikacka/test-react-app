import React from 'react'
import LoginGithub from 'react-login-github'
import {
    setAccessToken,
    setAuthToken,
} from '../../reducers/actions/auth'
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
            REACT_APP_GITHUB_CLIENT_SECRET: clientSecret,
        } = this.config

        const {
            t,
        } = this.props

        if (logged) {
            return <Redirect to="/" />
        }

        return (
            <div className="center-center">
                <LoginGithub
                    buttonText={t('loginButton')}
                    clientId={clientId}
                    onSuccess={data => {
                        setAuthToken(data.code)
                            .then(token => {
                                const fullUrl = `https://astrumq.com/githubAccessToken.php?client_id=${clientId}&client_secret=${clientSecret}&code=${token}`

                                return window.axios.post(fullUrl)
                                    .then(response => {
                                        const accessToken = response.data.split('&')[0].split('=')[1]

                                        return setAccessToken(accessToken)
                                    })
                            })
                            .then(() => this.setState({ logged: true }))
                            .then(() => window.location.reload())
                    }}
                    onFailure={() => window.swalert(t('loginFail', 'danger'))}
                />
            </div>
        )
    }
}

export default withConnectWrapper(state => ({
    auth: state.auth,
}))(Login)
