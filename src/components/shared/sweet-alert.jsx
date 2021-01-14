import React, {
    Component,
    Fragment,
} from 'react'

import SweetAlert from 'react-bootstrap-sweetalert'
import { unmountComponentAtNode } from 'react-dom'

export class Confirm extends Component {
    state = {
        showConfirm: false,
        isCanceled: false,
        isConfirmed: false,
        busy: false,
    }

    toggleShowConfirm = () => {
        this.setState({ showConfirm: !this.state.showConfirm })
    }

    setCancel = (value = true) => {
        this.setState({ isCanceled: value })
    }

    setConfirm = (value = true) => {
        this.setState({ isConfirmed: value })
    }

    onConfirm = () => {
        const {
            onConfirm,
        } = this.props

        this.setState({ busy: true })

        return onConfirm()
            .then(() => {
                this.setState({ busy: false })
            })
    }

    renderGate = () => {
        const {
            children: child,
        } = this.props

        return (
            <span onClick={this.toggleShowConfirm}>
                {child}
            </span>
        )
    }

    render = () => {
        const {
            title,
            cancelTitle,
            successTitle,
            confirmBtnText,
            cancelBtnText,
            onCancel,
            afterConfirm,
            children: child,
            onlySubmit,
        } = this.props

        const {
            showConfirm,
            isCanceled,
            isConfirmed,
            busy,
        } = this.state

        if (onlySubmit) {
            return (
                <span onClick={this.onConfirm}>
                    {child}
                </span>
            )
        }

        if (!showConfirm) {
            return this.renderGate()
        }

        if (isCanceled) {
            return (
                <Fragment>
                    {this.renderGate()}
                    <SweetAlert
                        danger
                        showCancel={false}
                        confirmBtnText="Zavřít"
                        confirmBtnBsStyle="info"
                        title={cancelTitle || 'Položka nebyla smazána.'}
                        onConfirm={() => {
                            this.toggleShowConfirm()
                            this.setCancel(false)
                        }}
                        onCancel={() => {
                            this.toggleShowConfirm()
                            this.setCancel(false)
                        }}
                    />
                </Fragment>
            )
        }

        if (isConfirmed) {
            return (
                <Fragment>
                    {this.renderGate()}
                    <SweetAlert
                        success
                        showCancel={false}
                        confirmBtnText="Zavřít"
                        confirmBtnBsStyle="info"
                        title={successTitle || 'Položka byla smazána.'}
                        onConfirm={() => {
                            this.toggleShowConfirm()
                            this.setConfirm(false)
                            if (afterConfirm && typeof afterConfirm === 'function') {
                                afterConfirm()
                            }
                        }}
                    />
                </Fragment>
            )
        }

        return (
            <Fragment>
                {this.renderGate()}
                <SweetAlert
                    info
                    showCancel
                    confirmBtnText={confirmBtnText || 'Ano'}
                    cancelBtnText={cancelBtnText || 'Ne'}
                    confirmBtnBsStyle="success"
                    cancelBtnBsStyle="default"
                    title={busy ? '...' : title}
                    onConfirm={() => {
                        this.onConfirm()
                            .then(() => {
                                this.setConfirm(true)
                            })
                    }}
                    onCancel={onCancel || this.setCancel}
                />
            </Fragment>
        )
    }
}

/**
 * Component for better alerts
 *
 * @inheritDoc http://djorg83.github.io/react-bootstrap-sweetalert/
 */
export class Alert extends Component {
    toggleShowAlert = () => {
        unmountComponentAtNode(document.getElementById('alert-container'))
    }

    render = () => {
        const {
            title,
            type,
            onConfirm,
        } = this.props

        return (
            <SweetAlert
                type={type || 'danger'}
                showCancel={false}
                confirmBtnText="Zavřít"
                confirmBtnBsStyle="info"
                title={title}
                onConfirm={() => {
                    const returnedValue = (typeof onConfirm === 'function') ? onConfirm() : null
                    if (returnedValue instanceof Promise) {
                        returnedValue.then(() => this.toggleShowAlert())
                    } else {
                        this.toggleShowAlert()
                    }
                }}
            />
        )
    }
}

/**
 * Component for better confirms
 *
 * @inheritDoc http://djorg83.github.io/react-bootstrap-sweetalert/
 */
export class SwConfirm extends Component {
    state = {
        busy: false,
    }

    toggleShowAlert = () => {
        unmountComponentAtNode(document.getElementById('alert-container'))
    }

    render = () => {
        const {
            title,
            type,
            confirmBtnText,
            cancelBtnText,
            onConfirm,
            afterConfirm,
            onCancel,
            confirmBtnBsStyle,
            showCancel,
        } = this.props

        const {
            busy,
        } = this.state

        return (
            <SweetAlert
                type={type || 'danger'}
                showCancel={showCancel ?? true}
                confirmBtnText={confirmBtnText || 'Ano'}
                cancelBtnText={cancelBtnText || 'Ne'}
                confirmBtnBsStyle={confirmBtnBsStyle || 'danger'}
                title={busy ? '...' : title}
                onConfirm={() => {
                    this.setState({ busy: true })
                    onConfirm()
                        .then(() => {
                            this.setState({ busy: true })

                            if (afterConfirm && typeof afterConfirm === 'function') {
                                afterConfirm().then(() => this.toggleShowAlert())
                            } else {
                                this.toggleShowAlert()
                            }
                        })
                }}
                onCancel={() => {
                    const returnedValue = (typeof onCancel === 'function') ? onCancel() : null
                    if (returnedValue instanceof Promise) {
                        returnedValue.then(() => this.toggleShowAlert())
                    } else {
                        this.toggleShowAlert()
                    }
                }}
            />
        )
    }
}
