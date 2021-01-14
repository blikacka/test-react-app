import React, { Component } from 'react'
import Modal from '../../../components/shared/modal'
import {
    i18n,
    withRouter ,
} from '../../../validator'
import { apolloWrapper } from '../../../components/shared/apollo-wrapper'
import { gql } from '@apollo/client'
import OverlayLoader from '../../../components/shared/overlay-loader'
import { Link } from 'react-router-dom'

@i18n()
@apolloWrapper()
@withRouter()
export default class ListModal extends Component {

    state = {
        userDetail: null,
        busy: false,
    }

    /**
     * Load user on mount
     */
    componentDidMount() {
        this.loadUserDetail()

        if (this.props.match?.params?.tab) {
            document.getElementById(`${this.props.match?.params?.tab}-tab`).click()
        }
    }

    /**
     * On watch new user load this new user
     *
     * @param {Object} prevProps
     */
    componentDidUpdate(prevProps) {
        const propsUser = this.props.match?.params?.user
        if (propsUser !== prevProps.match?.params?.user) {
            this.loadUserDetail(propsUser)
        }
    }

    /**
     * Load user detail
     *
     * @param {Number} userId
     * @return {Promise<void>}
     */
    loadUserDetail = (userId = null) => {
        const {
            user,
            apolloClient,
        } = this.props

        this.setState({ busy: true })

        const client = apolloClient()

        return client
        .query({
            query: gql`
                {
                    node(id: "${userId || user.id}") {
                        ... on User {
                            id
                            email
                            followers(first: 100) {
                                nodes {
                                    id
                                    login
                                    name
                                    avatarUrl
                                }
                                totalCount
                            }
                            avatarUrl
                            bio
                            name
                            repositories(first: 100) {
                                nodes {
                                    name
                                    description
                                }
                                totalCount
                            }
                        }
                    }
                }
            `
        })
        .then(result => this.setState({ userDetail: result.data.node }))
        .then(() => this.setState({ busy: false }))
    }

    /**
     * Render
     *
     * @return {null|*}
     */
    render() {
        const {
            user,
            t,
            toggleModal,
            history,
        } = this.props

        const {
            userDetail,
            busy,
        } = this.state

        if (!user) {
            return null
        }

        return (
            <Modal
                dialogClass="modal-lg"
                description={`${userDetail?.name}`}
                handleHideModal={toggleModal}
                content={() => (
                    <div className="w-100">
                        {busy && <OverlayLoader />}
                        <div className="card">
                            <div className="card-body d-flex flex-column">
                                <div className="d-flex flex-row flex-wrap align-items-center py-3 border-bottom">
                                    <div className="col-12 col-md-3">
                                        <img src={userDetail?.avatarUrl} alt="img" className="w-100" />
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <h3>{userDetail?.name}</h3>

                                    </div>
                                </div>
                                <p className="mt-2 col-12">
                                    {userDetail?.bio}
                                </p>
                            </div>
                        </div>

                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a
                                    className="nav-link active"
                                    id="repositories-tab" data-toggle="tab"
                                    href="#repositories"
                                    role="tab"
                                    aria-controls="repositories"
                                    aria-selected="true"
                                    onClick={() => userDetail?.id && history.push(`/${userDetail?.id}/repositories`)}
                                >
                                    {t('repositories')} ({userDetail?.repositories?.totalCount})
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    id="followers-tab"
                                    data-toggle="tab"
                                    href="#followers"
                                    role="tab"
                                    aria-controls="followers"
                                    aria-selected="false"
                                    onClick={() => userDetail?.id && history.push(`/${userDetail?.id}/followers`)}
                                >
                                    {t('followers')} ({userDetail?.followers?.totalCount})
                                </a>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div
                                className="tab-pane fade show active"
                                id="repositories"
                                role="tabpanel"
                                aria-labelledby="repositories-tab"
                            >
                                {userDetail?.repositories?.nodes?.map?.((repository, index) => (
                                    <div className="card" key={index}>
                                        <div className="card-body">
                                            <h5>{repository?.name}</h5>
                                            <p>{repository?.description}</p>
                                        </div>
                                    </div>
                                ))}
                                {userDetail?.repositories?.totalCount > 100 && <div className="my-3">@TODO: pagination</div>}
                            </div>
                            <div
                                className="tab-pane fade"
                                id="followers"
                                role="tabpanel"
                                aria-labelledby="followers-tab"
                            >
                                {userDetail?.followers?.nodes?.map?.((follower, index) => (
                                    <Link to={`/${follower?.id}/followers`} className="d-flex flex-row align-items-center border-bottom pl-2" key={index}>
                                        <img src={follower?.avatarUrl} alt="Follower" width="30" className="mr-2" />
                                        <b className="mb-0 mr-2">{follower?.name}</b>
                                        <small>({follower?.login})</small>
                                    </Link>
                                ))}
                                {userDetail?.followers?.totalCount > 100 && <div className="my-3">@TODO: pagination</div>}
                            </div>
                        </div>
                    </div>
                )}
            />
        )
    }

}