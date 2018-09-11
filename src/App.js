import React, { Component } from 'react';
import './App.css';

import GuessedWords from './components/GuessedWords';
import Congrats from './components/Congrats';
import Dropdown from './components/Dropdown';
import { DEBIT_TYPE_OPTIONS } from './common/constants';

class App extends Component {
  
  filterCallback = (value) => {
    console.log(value);
  };
  
  render() {
    return (
      <div className="container">
        <h1>Joto</h1>
        <div style={{margin: '20px'}} >
          <Dropdown items={DEBIT_TYPE_OPTIONS} selectedCallback={this.filterCallback} />
        </div>
        <Congrats success={true} />
        <GuessedWords guessedWords={[
          { guessedWord: 'train', letterMatchCount: 3 }
        ]}/>
      </div>
    );
  }
}

export default App;
