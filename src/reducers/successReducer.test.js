import successReducer from './successReducer';
import { actionTypes } from '../actions';

/* global expect */
describe('successReducer', () => {
    it('should return the default initial state of `false` when no action is passed', () => {
        const newState = successReducer(undefined, {});
        expect(newState).toBe(false);
        
    });
    
    it('should return the state of `true` when action is passed', () => {
        const newState = successReducer(undefined, {type: actionTypes.CORRECT_GUESS} );
        expect(newState).toBe(true);
    });
    
})