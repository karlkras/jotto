import React from 'react';
import { shallow, mount } from 'enzyme';
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

describe('Input', () => {
    describe('renders', () => {
        describe('word has not been guessed', () => {
            test('renders component without errors', () => {
                
            });
            
            test('renders the input box', () => {
                
            });
            
            test('renders the submit button', () => {
                
            });
        });
        
        describe('word has been guessed', () => {
            test('renders component without errors', () => {
                
            });
            
            test('does not render the input box', () => {
                
            });
            
            test('does not render the submit button', () => {
                
            });
        });
    });
    
    describe('update state', () => {
        test('', () => {
        });
    });
    
})