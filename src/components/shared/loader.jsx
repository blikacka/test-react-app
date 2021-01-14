import React, { Component } from 'react'
import classnames from 'classnames'

/**
 * @description Base loader definition
 *      USAGE
 *          <Loader
 *              *** PROPS ***
 *          />
 *
 *      PROPS - all props are optional
 *          height    - height of loader
 *          width     - width of loader
 *          className - additional CSS classes
 *
 */

export default class Loader extends Component {

    /**
     * Render image loading
     *
     *  @return {*}
     */
    render() {
        const {
            height,
            width,
            className,
        } = this.props

        const classes = className || ''

        return (
            <div className={classnames({
                'loader-container': true,
                [classes]: !!classes,
            })}
            >
                <img
                    src="/images/loader.svg"
                    height={height || null}
                    width={width || null}
                    alt="Loading..."
                />
            </div>
        )
    }
}
