import React from 'react'
import Configurator from '../configurator'
import GithubUsersSearch from './github-users/search'
import GithubUsersList from './github-users/list/list'

export default class Index extends Configurator {

    /**
     * Render
     *
     * @return {*}
     */
    render() {
        return (
            <div className="container d-flex flex-row flex-wrap">
                <div className="col-12 col-md-3">
                    <GithubUsersSearch />
                </div>
                <div className="col-12 col-md-9">
                    <GithubUsersList />
                </div>
            </div>
        )
    }
}
