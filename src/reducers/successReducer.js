import { actionTypes } from '../actions'
/**
 * @function successReducer
 * @param {array} state - Array of guessed words.
 * @param {object} action - action to be reduced.
 * @return {boolean} - new success state.
 */
export default (state=false, action) => {
    switch (action.type) {
        case actionTypes.CORRECT_GUESS:
            state=true;
            break;
        default:
             //nothing to do.
    }
    return state;
};