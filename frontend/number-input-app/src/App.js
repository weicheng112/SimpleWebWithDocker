import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [number, setNumber] = useState("");
  const [response, setResponse] = useState(null);
  const [clientIp, setClientIp] = useState("");

  useEffect(() => {
    // Fetch the client IP address from ipify API
    const fetchIP = async () => {
      try {
        const res = await axios.get("https://api.ipify.org?format=json");
        setClientIp(res.data.ip);
      } catch (error) {
        console.error("Failed to fetch IP address:", error);
      }
    };

    fetchIP();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://backend-ALB-1-1672505141.us-east-1.elb.amazonaws.com/submit-number/",
        {
          number: parseInt(number),
        }
      );
      setResponse(`The number you entered is: ${result.data.received_number}`);
    } catch (error) {
      console.error("Error submitting number:", error);
    }
  };

  return (
    <div className="App">
      <h1>Enter a Number</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {response && <p>{response}</p>}
      <p>Your IP address is: {clientIp}</p>
    </div>
  );
}

export default App;
