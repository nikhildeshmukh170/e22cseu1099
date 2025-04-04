import React from "react";
import './NumberDisplay.css';

const NumberDisplay = ({ prevState, numbers, avg }) => {
    return (
        <div className="number-display">
            <h2>📊 Window Data Overview</h2>

            <div className="data-section">
                <div className="data-box">
                    {JSON.stringify(prevState)}
                </div>
            </div>

            <div className="data-section">
                <div className="data-box">
                    {JSON.stringify(numbers)}
                </div>
            </div>

            <div className="average-section">
                <p className="average-value">{avg}</p>
            </div>
        </div>
    );
};

export default NumberDisplay;
