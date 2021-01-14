import React, { Component } from 'react'

export default class ListRow extends Component {

    /**
     * Render
     *
     * @return {*}
     */
    render() {
        const {
            user,
            toggleModal,
            key,
        } = this.props

        return (
            <div onClick={() => toggleModal(user)} key={key} className="card cursor-pointer-opacity">
                <div className="card-body d-flex flex-row justify-content-between">
                    <div>
                        <b className="mr-2">{user.name}</b>
                        <small>({user.login})</small>
                    </div>
                    <div>
                        <i className="fas fa-arrow-right" />
                    </div>
                </div>
            </div>
        )
    }
}
