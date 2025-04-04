const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const API_BASE = "http://20.244.56.144/evaluation-service";
const DEFAULT_TOKEN = "your-static-fallback-token";
const TOKEN = process.env.REACT_APP_API_TOKEN || DEFAULT_TOKEN;

// Check if token is loaded
if (!TOKEN) {
  console.error("❌ API token not found in .env file. Please check REACT_APP_API_TOKEN.");
  process.exit(1);
}

app.get("/numbers/:type", async (req, res) => {
  const { type } = req.params;
  const validTypes = ["primes", "fibo", "even", "rand"];
  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: "Invalid number type." });
  }

  const url = `${API_BASE}/${type}`;

  try {
    console.log(`📡 Fetching ${type} from ${url} with token...`);

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    console.log("✅ Data received from external API:", response.data);

    res.json(response.data);
  } catch (error) {
    if (error.response?.status === 401) {
        alert("⚠️ Invalid or expired token. Please update your token.");
      } else if (error.name === "CanceledError") {
        console.warn("⏱ Request timed out");
      } else {
        console.error("❌ Unexpected error:", error);
      }
    console.error("❌ Error fetching from external API:");
    console.error("Status:", error.response?.status);
    console.error("Data:", error.response?.data);
    console.error("Message:", error.message);

    res.status(error.response?.status || 500).json({
      error: error.response?.data || "Internal Server Error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
