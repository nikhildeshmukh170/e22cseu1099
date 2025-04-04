import React from "react";
import './NumberDisplay.css';
import defaultData from "../demo.json";

const NumberDisplay = ({ prevState, numbers, avg }) => {
  const displayPrev = Array.isArray(prevState) && prevState.length > 0 ? prevState : defaultData.prevState;
  const displayCurrent = Array.isArray(numbers) && numbers.length > 0 ? numbers : defaultData.numbers;
  const displayAvg = typeof avg === 'string' && avg.length > 0 ? avg : defaultData.avg;

  return (
    <div className="number-display-wrapper">
      <h2 className="display-title">📊 Sliding Window Data</h2>

      <div className="display-container">
        <div className="data-card">
          <h3>🔙 Previous Window</h3>
          <div className="data-content">{JSON.stringify(displayPrev)}</div>
        </div>

        <div className="data-card">
          <h3>📥 Current Window</h3>
          <div className="data-content">{JSON.stringify(displayCurrent)}</div>
        </div>

        <div className="data-card average-card">
          <h3>📈 Average</h3>
          <div className="average-number">{displayAvg}</div>
        </div>
      </div>
    </div>
  );
};

export default NumberDisplay;
