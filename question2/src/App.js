import React from 'react';
import NumberFetcher from './components/NumberFetcher';
import NumberDisplay from './components/NumbarDisplay';
import './App.css';

const App = () => {
  return (
    <div className="app-wrapper">
      <h1 className="app-title">📐 Average Calculator Microservice</h1>
      <NumberFetcher />
      <NumberDisplay />
    </div>
  );
};

export default App;
