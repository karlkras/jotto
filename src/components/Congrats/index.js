import React from 'react';
import PropTypes from 'prop-types';

/**
 * Functional react component for congratulatory message.
 * @function congrates
 * @ {object} success -  Boolean object that indicates if message should be
 * rendered or not.
 * @returns {JSX.Element} = Rendered component (or null if `success` props is false)
*/
const congrats = ({ success }) => (
  <div data-test="component-congrats" className="alert-success">
    { success && (
    <span data-test="congrats-message">Wahoo! You won!</span>
    )}
  </div>
);

congrats.propTypes = {
  success: PropTypes.bool.isRequired,
};

export default congrats;
