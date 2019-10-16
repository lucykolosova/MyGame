import React from 'react';
import './App.css';
import FormGame from './game/form/FormGameContainer';
import FieldOFPlayContainer from './game/gameField/FieldOFPlayContainer';

function App() {
  return (
    <div className="App">
      <FormGame />
      <FieldOFPlayContainer />
    </div>
  );
}

export default App;
