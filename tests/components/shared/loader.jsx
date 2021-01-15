import {
    describe,
    expect,
    it,
} from '@jest/globals'
import React from 'react'
import Loader from '../../../src/components/shared/loader'
import ReactDOM from 'react-dom'

describe('Loader', () => {
    const className = 'test-class'

    it('should render without crashing', () => {
        const div = document.createElement('div')
        const component = <Loader />
        ReactDOM.render(component, div)

        expect(div.innerHTML).toContain('loader-container')
    })

    it('should render without additional class', () => {
        const div = document.createElement('div')
        const component = <Loader className={null} />
        ReactDOM.render(component, div)

        expect(div.innerHTML).toBeTruthy()
    })

    it('should render with additional class given', () => {
        const div = document.createElement('div')
        const component = <Loader className={className} />
        ReactDOM.render(component, div)

        expect(div.innerHTML).toContain(className)
    })
})
