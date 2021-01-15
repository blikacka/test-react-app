import React, { Component } from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Store } from 'redux'

/**
 * Adding redux provider and store wrapper to render connected components.
 *
 * @param {Component} component
 * @param {Store} store
 */
export function renderWithRedux(component, store) {
    return render(
        <Provider store={store}>
            <MemoryRouter>
                {component}
            </MemoryRouter>
        </Provider>
    )
}
