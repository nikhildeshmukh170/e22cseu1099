import React, { useState } from "react";
import axios from "axios";
import "./NumberFetcher.css";

const NumberFetcher = () => {
  const [numbers, setNumbers] = useState([]);
  const [prevState, setPrevState] = useState([]);
  const [avg, setAvg] = useState(0);
  const [activeBtn, setActiveBtn] = useState(null);
  const [error, setError] = useState(null);
  const [apiNumbers, setApiNumbers] = useState([]);

  const windowSize = 10;

  const apiUrls = {
    p: "http://20.244.56.144/evaluation-service/primes",
    f: "http://20.244.56.144/evaluation-service/fibo",
    e: "http://20.244.56.144/evaluation-service/even",
    r: "http://20.244.56.144/evaluation-service/rand",
  };

  const getToken = async () => {
    const tokenUrl = "http://20.244.56.144/evaluation-service/auth";
    const credentials = {
      email: "e22cseu1099@bennett.edu.in",
      name: "deshmukh nikhil dipak",
      rollNo: "e22cseu1099",
      accessCode: "rtCHZJ",
      clientID: "c7c34f41-12e3-4603-a287-e824d125cd7f",
      clientSecret: "KyXxAgFTFAsXJcNs"
    };

    try {
      const res = await axios.post(tokenUrl, credentials);
      return res.data.access_token;
    } catch (err) {
      console.error("Token fetch failed", err);
      return null;
    }
  };

  const fetchNumbers = async (type) => {
    if (!apiUrls[type]) return;

    setActiveBtn(type);
    setError(null);

    const token = await getToken();
    if (!token) {
      setError("Failed to fetch token.");
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 500);

    try {
      const response = await axios.get(apiUrls[type], {
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      clearTimeout(timeoutId);

      const receivedNumbers = response.data.numbers || [];
      setApiNumbers(receivedNumbers);

      const uniqueNew = receivedNumbers.filter((num) => !numbers.includes(num));
      const updatedWindow = [...numbers, ...uniqueNew].slice(-windowSize);

      setPrevState([...numbers]);
      setNumbers(updatedWindow);

      const sum = updatedWindow.reduce((acc, val) => acc + val, 0);
      const average = updatedWindow.length ? (sum / updatedWindow.length).toFixed(2) : 0;
      setAvg(average);
    } catch (err) {
      clearTimeout(timeoutId);
      console.error("API request failed or timed out", err);
      setError("API request failed or timed out.");
    }
  };

  return (
    <div className="fetcher-wrapper">
      <div className="fetcher-container">
        <h1 className="fetcher-title">📊 Average Calculator</h1>

        <div className="fetcher-buttons">
          <button onClick={() => fetchNumbers("p")} className={`fetcher-btn ${activeBtn === "p" ? "active" : ""}`}>
            Prime
          </button>
          <button onClick={() => fetchNumbers("f")} className={`fetcher-btn ${activeBtn === "f" ? "active" : ""}`}>
            Fibonacci
          </button>
          <button onClick={() => fetchNumbers("e")} className={`fetcher-btn ${activeBtn === "e" ? "active" : ""}`}>
            Even
          </button>
          <button onClick={() => fetchNumbers("r")} className={`fetcher-btn ${activeBtn === "r" ? "active" : ""}`}>
            Random
          </button>
        </div>

        <div className="fetcher-grid">
          <div className="fetcher-column card">
            <div className="window-box">
              <h3>Previous Window</h3>
              <p>{JSON.stringify(prevState)}</p>
            </div>
            <div className="window-box">
              <h3>Current Window</h3>
              <p>{JSON.stringify(numbers)}</p>
            </div>
            <div className="window-box">
              <h3>Received from API</h3>
              <p>{JSON.stringify(apiNumbers)}</p>
            </div>
          </div>

          <div className="fetcher-column card score-box">
            <h3>Average</h3>
            <p className="score">{avg}</p>
            {error && <p className="error-msg">⚠ {error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberFetcher;
