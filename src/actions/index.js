export const actionTypes = {
    CORRECT_GUESS: 'CORRECT_GUESS'
};

/**
 * @function correctGuess
 * @returns {object} - Action object with the type `CORRECT_GUESS`
 */
export const correctGuess = () => {
    return { type: actionTypes.CORRECT_GUESS };
};