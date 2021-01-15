import {
    describe,
    expect,
    it,
} from '@jest/globals'

import authReducer, {
    SET_AUTH_TOKEN,
    SET_ACCESS_TOKEN,
} from '../../src/reducers/auth'

describe('Auth Reducer', () => {
    const initialState = {
        test: 'test',
    }

    it('should test unknown action', () => {
        expect(authReducer(null, { type: 'unknown' })).toEqual(null)
    })

    it('should test initial state', () => {
        expect(authReducer(initialState, { type: 'unknown' })).toEqual(initialState)
    })

    it('should text SET_AUTH_TOKEN', () => {
        const actionNotificationFetched = {
            type: SET_AUTH_TOKEN,
            token: 'abcd',
        }

        expect(authReducer(initialState, actionNotificationFetched)).toEqual({
            ...initialState,
            token: 'abcd',
        })
    })

    it('should text SET_ACCESS_TOKEN', () => {
        const actionNotificationFetched = {
            type: SET_ACCESS_TOKEN,
            accessToken: 'abcd',
        }

        expect(authReducer(initialState, actionNotificationFetched)).toEqual({
            ...initialState,
            accessToken: 'abcd',
        })
    })
})
