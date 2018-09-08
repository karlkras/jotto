import React from 'react';
import PropTypes from 'prop-types';

const GuessedWords = ({ guessedWords }) => {
    const makeRow = (item, key) => (
        <tr data-test='guessed-word' key={key}>
            <td>
                {item.guessedWord}
            </td>
            <td>
                {item.letterMatchhCount}
            </td>
        </tr>
    );
    
    return (
      <div data-test="component-guessed-words">
        {
        !guessedWords.length ? (
        <span data-test="guessed-word-instructions">
            Some word guess instructions!
        </span>
        ) : (
            <div data-test="guessed-words" >
                <h3>Guessed Words</h3>
                <table className="table table-sm">
                    <thead className="thead-light">
                        <tr>
                            <th>Guess</th>
                            <th>Matching Letters</th>
                        </tr>
                    </thead>
                    <tbody>
                    { guessedWords.map((word, idx) => makeRow(word, idx)) }
                    </tbody>
                </table>
            </div>
        )
      }
      </div>
    );
};

GuessedWords.propTypes = {
  guessedWords: PropTypes.arrayOf(
    PropTypes.shape({
      guessedWord: PropTypes.string.isRequired,
      letterMatchCount: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default GuessedWords;
