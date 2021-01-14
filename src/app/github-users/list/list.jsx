import React from 'react'
import Configurator from '../../../configurator'
import {
    i18nWrapper,
    withRouterConnectWrapper,
} from '../../../validator'
import OverlayLoader from '../../../components/shared/overlay-loader'
import { setUsersBusy, setUsersData } from '../../../reducers/actions/users'
import ListRow from './list-row'
import { gql } from '@apollo/client'
import { apolloWrapper } from '../../../components/shared/apollo-wrapper'
import ListModal from './modal'

@apolloWrapper()
class List extends Configurator {

    state = {
        modalOpen: false,
        modalUser: null,
    }

    /**
     * On mount set prev state if is exists
     */
    componentDidMount() {
        const paramsUser = this.props.match.params.user
        if (paramsUser && paramsUser !== 'undefined') {
            this.toggleModal({
                id: paramsUser,
            })
        }
    }

    /**
     * Search users
     *
     * @return {*}
     */
    searchUsers = () => {
        const {
            users: {
                searchString,
            },
            apolloClient
        } = this.props

        const client = apolloClient()

        return client
            .query({
                query: gql`
                    {
                        search(query: "${searchString}", type: USER, first: 100) {
                            nodes {
                                ... on User {
                                    id
                                    email
                                    login
                                    name
                                }
                            }
                        }
                    }
                `
            })
            .then(result => setUsersData(result?.data?.search?.nodes || null))
    }

    /**
     * On update input start new search
     *
     * @param prevProps
     */
    componentDidUpdate(prevProps) {
        const searchString = this.props.users.searchString
        if (prevProps.users.searchString !== searchString) {
            setUsersBusy(true)

            this.searchUsers()
                .then(() => setUsersBusy(false))
        }
    }

    /**
     * Show / hide modal
     *
     * @param {Object|null} user
     */
    toggleModal = (user = null) => {
        this.setState({
            modalOpen: !this.state.modalOpen,
            modalUser: user,
        })

        if (user.id) {
            const openedTab = this.props.match.params.tab
            this.props.history.push(`/${user.id}${openedTab ? `/${openedTab}` : ''}`)
        } else {
            this.props.history.push('/')
        }
    }

    /**
     * Render
     *
     * @return {*}
     */
    render() {
        const {
            users: {
                busy,
                data,
                searchString,
            },
            t,
        } = this.props

        const {
            modalOpen,
            modalUser,
        } = this.state

        if (!modalOpen && !searchString || searchString === '') {
            return (
                <div>
                    {t('githubUsers.list.startSearch')}
                </div>
            )
        }

        if (!modalOpen && searchString && !busy && (!data || data.length === 0)) {
            return (
                <div>
                    {t('githubUsers.list.noResults')}
                </div>
            )
        }

        return (
            <div>
                <h2>
                    {t('usersList')}
                </h2>

                {data && data.map((user, index) => (
                    <ListRow
                        key={index}
                        user={user}
                        toggleModal={this.toggleModal}
                    />
                ))}
                {busy && <OverlayLoader />}
                {modalOpen && <ListModal toggleModal={this.toggleModal} user={modalUser} />}
            </div>
        )
    }
}

export default withRouterConnectWrapper(state => ({
    users: state.users,
    auth: state.auth,
}))(i18nWrapper(List))
