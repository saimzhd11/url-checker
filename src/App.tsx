import React from 'react';
import './App.css';
import { URLChecker } from './Components';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <URLChecker />
      </header>
    </div>
  );
};

export default App;
