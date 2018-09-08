import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import checkPropTypes from 'check-prop-types';
import rootReducer from '../src/reducers';
import { middleWares } from '../src/configeStore'


/**
 * Create a testing store with imported reducers, middleware, and initial state
 * globals: rootReducer
 * @function storeFactory
 * @param {object} initalState - initial stated of the store.
 * @returns {Store} - Redux store
 */
export const storeFactory = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(...middleWares)(createStore);

    return createStoreWithMiddleware(rootReducer);
};

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test attribute for search.
 * @returns {ShalowWrapper}
*/
export const findByTestAttr = (wrapper, val) => (
    wrapper.find(`[data-test='${val}']`)
);

/* global expect */
export const checkProps = (component, conformingProps) => {
    const propError = checkPropTypes(
        component.propTypes,
        conformingProps,
        'prop',
        component.name
    );
    expect(propError).toBeUndefined();
};


