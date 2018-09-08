import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../../../test/testHelper'; // eslint-disable-line no-unused-vars

import GuessedWords from '.';

const defaultProps = {
  guessedWords: [{ guessedWord: 'train', letterMatchCount: 3 }],
};

/**
 * Factory function to create a ShallowWrapper fot he Counter component.
 * @function setup
 * @param {object} props - Component prps specfic to this setup.
 * @param {object} state - Initial state for the setup.
 * @returns {ShallowWrapper}
*/
const setup = (props = {}, state = null) => {
  const theProps = { ...defaultProps, ...props };
  const wrapper = shallow(<GuessedWords {...theProps} />);
  if (state) {
    wrapper.setState(state);
  }
  return wrapper;
};

/* global expect */
describe('GuessedWords', () => {
  test('does not throw warning with expected props', () => {
    checkProps(GuessedWords, defaultProps);
  });

  describe('if there are no words guessed', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup({ guessedWords: [] });
    });

    test('renders without errors', () => {
      expect(findByTestAttr(wrapper, 'component-guessed-words').length).toBe(1);
    });

    test('renders instructions to guess a word', () => {
      const instructions = findByTestAttr(wrapper, 'guessed-word-instructions');
      expect(instructions.text().length).not.toBe(0);
    });
  });

  describe('if there are words guessed', () => {
    let wrapper;
    const guessedWords = [
      { guessedWord: 'train', letterMatchCount: 3},
      { guessedWord: 'agile', letterMatchCount: 1},
      { guessedWord: 'party', letterMatchCount: 3}
    ];
    
    beforeEach(() => {
      wrapper = setup({guessedWords});
    });
    
    test('renders without errors', () => {
      expect(findByTestAttr(wrapper, 'component-guessed-words').length).toBe(1);
    });
    
    test('renders "guessed words" section', () => {
      const theWords = findByTestAttr(wrapper, 'guessed-words');
      expect(theWords.length).toBe(1);
    });
    
    test('correct number of guessed words', () => {
      const theWords = findByTestAttr(wrapper, 'guessed-word');
      expect(theWords.length).toBe(guessedWords.length);
    });

  });
});
