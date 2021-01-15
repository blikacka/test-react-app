import React  from 'react'
import { getUrlParameter } from '../shared/get-url-parameter'
import {
    setAccessToken,
    setAuthToken,
} from '../../reducers/actions/auth'
import Configurator from '../../configurator'
import OverlayLoader from '../shared/overlay-loader'

export default class LoginProcess extends Configurator {

    /**
     * On mount start login process
     */
    componentDidMount() {
        const {
            REACT_APP_GITHUB_CLIENT_ID: clientId,
            REACT_APP_GITHUB_CLIENT_SECRET: clientSecret,
        } = this.config

        const codeParameter = getUrlParameter('code')

        if (codeParameter) {
            setAuthToken(codeParameter)
                .then(token => {
                    const fullUrl = `https://astrumq.com/githubAccessToken.php?client_id=${clientId}&client_secret=${clientSecret}&code=${token}`

                    return window.axios.post(fullUrl)
                        .then(response => {
                            const accessToken = response.data.split('&')[0].split('=')[1]

                            return setAccessToken(accessToken)
                        })
                })
                .then(() => window.location.href = '/login')
        }
    }

    /**
     * Render loader
     *
     * @return {*}
     */
    render() {
        return (
            <OverlayLoader />
        )
    }
}
