import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../../../test/testHelper';

import Congrats from './';

const defaultProps = { success: false };

/**
 * Factory function to create a ShallowWrapper fot he Counter component.
 * @function setup
 * @param {object} props - Component prps specfic to this setup.
 * @param {object} state - Initial state for the setup.
 * @returns {ShallowWrapper}
*/
const setup = (props={}, state=null ) => {
    const theProps = {...defaultProps, ...props};
    const wrapper = shallow(<Congrats {...theProps} />);
    if(state) {
        wrapper.setState(state);
    }
    return wrapper;
};

/* global expect */
describe('Congrats', () => {
    test('renders without errors', () => {
        const wrapper = setup();
        expect(findByTestAttr(wrapper, 'component-congrats').length).toBe(1);
    });
    
    test('renders no text when `success` prop is false', () => {
        const wrapper = setup();
        expect(findByTestAttr(wrapper, 'congrats-message').exists()).toBe(false);
    });
    
    test('renders success message when `success` prop is true', () => {
        const wrapper = setup( {success: true});
        expect(findByTestAttr(wrapper, 'congrats-message').exists()).toBe(true);
    });
    
    test('does not throw warning with expected props', () => {
        const expectedProps = { success: false };
        checkProps(Congrats, expectedProps);
    });
});