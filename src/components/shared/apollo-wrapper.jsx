import React from 'react'
import Configurator from '../../configurator'
import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { withConnectWrapper } from '../../validator'

/**
 * Wrap apollo into component
 *
 * @return {function(*): *}
 */
export function apolloWrapper() {
    return function(Child) {
        class ApolloWrapper extends Configurator {
            getApolloClient = () => {
                const {
                    auth: {
                        accessToken,
                    }
                } = this.props

                const {
                    REACT_APP_GITHUB_GRAPH_URL: graphUrl,
                } = this.config

                const httpLink = createHttpLink({
                    uri: graphUrl,
                });

                const authLink = setContext((_, { headers }) => {
                    // get the authentication token from local storage if it exists
                    // return the headers to the context so httpLink can read them
                    return {
                        headers: {
                            ...headers,
                            authorization: accessToken ? `Bearer ${accessToken}` : "",
                        }
                    }
                });

                return new ApolloClient({
                    link: authLink.concat(httpLink),
                    cache: new InMemoryCache()
                });
            }

            render() {
                return <Child {...this.props} {...this.context} apolloClient={this.getApolloClient} />
            }
        }

        return withConnectWrapper(state => ({
            auth: state.auth,
        }))(ApolloWrapper)
    }
}
