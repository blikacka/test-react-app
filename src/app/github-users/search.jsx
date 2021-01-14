import React from 'react'
import Configurator from '../../configurator'
import { i18nWrapper, withConnectWrapper } from '../../validator'
import { DebounceInput } from 'react-debounce-input'
import { setUsersSearchString } from '../../reducers/actions/users'

class Search extends Configurator {

    /**
     * Change search value
     *
     * @param {SyntheticInputEvent} event
     * @return {*}
     */
    changeSearch = event => setUsersSearchString(event.target.value)

    /**
     * Render
     *
     * @return {*}
     */
    render() {
        const {
            users: {
                searchString,
            },
            t,
        } = this.props

        return (
            <div className="form-group vertically-center-lg ml-3">
                <label htmlFor="searching">{t('search')}</label>
                <DebounceInput
                    minLength={2}
                    debounceTimeout={300}
                    onChange={this.changeSearch}
                    value={searchString}
                    className="form-control"
                    placeholder={t('search')}
                    id="searching"
                />
            </div>
        )
    }
}

export default withConnectWrapper(state => ({
    users: state.users,
}))(i18nWrapper(Search))
