import React, { Component } from 'react'
import Loader from './loader'
import classnames from 'classnames'

/**
 * Overlay loader
 */
export default class OverlayLoader extends Component {
    /**
     * Render
     *
     * @return {*}
     */
    render = () => (
        <div className={classnames({
            'loader': true,
            [this.props.className]: !!this.props.className,
        })}>
            <div className="loader__inner">
                <div className="loader__content">
                    <Loader />
                </div>
            </div>
        </div>
    )
}
