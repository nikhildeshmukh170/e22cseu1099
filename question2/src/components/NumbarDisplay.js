import React from "react";

const NumberDisplay = ({ prevState, numbers, avg }) => {
    return (
        <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-lg space-y-6">
            <h2 className="text-2xl font-semibold text-center text-blue-600">📊 Window Data Overview</h2>

            <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-700">🕓 Previous State</h3>
                <div className="p-3 bg-gray-100 rounded-md text-sm text-gray-800 break-words">
                    {JSON.stringify(prevState)}
                </div>
            </div>

            <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-700">🔄 Current State</h3>
                <div className="p-3 bg-gray-100 rounded-md text-sm text-gray-800 break-words">
                    {JSON.stringify(numbers)}
                </div>
            </div>

            <div className="text-center mt-4">
                <h3 className="text-lg font-medium text-gray-700">📈 Average</h3>
                <p className="text-2xl font-bold text-green-600">{avg}</p>
            </div>
        </div>
    );
};

export default NumberDisplay;
