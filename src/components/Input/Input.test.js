import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, storeFactory } from '../../../test/testHelper'; // eslint-disable-line no-unused-vars

import Input from './';

/**
 * Factory function to create a ShallowWrapper fot he Input component.
 * @function setup
 * @param {object} initialState - Initial state for this setup.
 * @param {object} state - Initial state for the setup.
 * @returns {ShallowWrapper}
*/
const setup = (initialState={}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Input store={store}/>).dive();

  return wrapper;
};

/* global expect */
describe('Input', () => {
    describe('renders', () => {
        describe('word has not been guessed', () => {
            let wrapper;
            beforeEach(() => {
                const initialState = { success: false };
                wrapper = setup(initialState);
            });
            
            test('renders component without errors', () => {
                const inputComponent = findByTestAttr(wrapper, 'component-input');
                expect(inputComponent.length).toBe(1);
            });
            
            test('renders the input box', () => {
                const inputBox = findByTestAttr(wrapper, 'input-box');
                expect(inputBox.length).toBe(1);
            });
            
            test('renders the submit button', () => {
                const submitButton = findByTestAttr(wrapper, 'submit-button');
                expect(submitButton.length).toBe(1);
            });
        });
        
        describe('word has been guessed', () => {
            let wrapper;
            beforeEach(() => {
                const initialState = { success: true };
                wrapper = setup(initialState);
            });
            
            test('renders component without errors', () => {
                const inputComponent = findByTestAttr(wrapper, 'component-input');
                expect(inputComponent.length).toBe(1);
            });
            
            test('does not render the input box', () => {
                const inputBox = findByTestAttr(wrapper, 'input-box');
                expect(inputBox.length).toBe(0);
            });
            
            test('does not render the submit button', () => {
                const submitButton = findByTestAttr(wrapper, 'submit-button');
                expect(submitButton.length).toBe(0);
            });
        });
    });
})