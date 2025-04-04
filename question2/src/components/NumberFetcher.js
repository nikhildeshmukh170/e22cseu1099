import React, { useState } from "react";
import axios from "axios";
import "./NumberFetcher.css";

const NumberFetcher = () => {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);
  const [prevState, setPrevState] = useState([]);
  const [avg, setAvg] = useState("3.00");
  const [activeBtn, setActiveBtn] = useState(null);
  const [error, setError] = useState("");

  const windowSize = 10;

  const apiUrls = {
    p: "http://20.244.56.144/evaluation-service/primes",
    f: "http://20.244.56.144/evaluation-service/fibo",
    e: "http://20.244.56.144/evaluation-service/even",
    r: "http://20.244.56.144/evaluation-service/rand",
  };

  const proxy = "https://corsproxy.io/?";

  const fetchNumbers = async (type) => {
    if (!apiUrls[type]) return;

    setActiveBtn(type);
    setError("");

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 500);

      const response = await axios.get(proxy + encodeURIComponent(apiUrls[type]), {
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
        },
      });

      clearTimeout(timeoutId);

      const receivedNumbers = response.data.numbers || [];
      const uniqueNew = receivedNumbers.filter((num) => !numbers.includes(num));
      const updatedWindow = [...numbers, ...uniqueNew].slice(-windowSize);

      setPrevState([...numbers]);
      setNumbers(updatedWindow);

      const sum = updatedWindow.reduce((acc, val) => acc + val, 0);
      const average = updatedWindow.length ? (sum / updatedWindow.length).toFixed(2) : 0;
      setAvg(average);
    } catch (error) {
      if (error.name === "AbortError") {
        setError("⏱️ Request timed out (over 500ms). Try again.");
      } else if (error.response?.status === 401) {
        setError("🔒 Unauthorized: Invalid authentication.");
      } else {
        setError("❌ Network error or invalid response.");
      }
      console.error("API request failed:", error);
    }
  };

  return (
    <div className="fetcher-wrapper">
      <div className="fetcher-container">
        <h1 className="fetcher-title">📊 Average Calculator</h1>

        {error && <div className="fetcher-error">{error}</div>}

        <div className="fetcher-buttons">
          <button
            onClick={() => fetchNumbers("p")}
            className={`fetcher-btn ${activeBtn === "p" ? "active" : ""}`}
          >
            Prime
          </button>
          <button
            onClick={() => fetchNumbers("f")}
            className={`fetcher-btn ${activeBtn === "f" ? "active" : ""}`}
          >
            Fibonacci
          </button>
          <button
            onClick={() => fetchNumbers("e")}
            className={`fetcher-btn ${activeBtn === "e" ? "active" : ""}`}
          >
            Even
          </button>
          <button
            onClick={() => fetchNumbers("r")}
            className={`fetcher-btn ${activeBtn === "r" ? "active" : ""}`}
          >
            Random
          </button>
        </div>

        <div className="fetcher-grid">
          <div className="fetcher-column card">
            <div className="window-box">
              <h3>🔙 Previous Window</h3>
              <p>{JSON.stringify(prevState)}</p>
            </div>
            <div className="window-box">
              <h3>🟢 Current Window</h3>
              <p>{JSON.stringify(numbers)}</p>
            </div>
          </div>

          <div className="fetcher-column card score-box">
            <h3>📈 Average</h3>
            <p className="score">{avg}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberFetcher;
