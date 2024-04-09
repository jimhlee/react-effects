import { useState } from 'react';
import logo from './logo.svg'
import './App.css';
import DeckOfCards from './DeckOfCards';

/** Component for entire page.
 *
 * Props: none
 * State: none
 *
*/

function App() {

  return (
    <div className="App">
      <DeckOfCards />
    </div>
  );
};

export default App;
