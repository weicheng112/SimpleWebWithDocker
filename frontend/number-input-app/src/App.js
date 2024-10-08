import React, { useState } from "react";
import axios from "axios";

function App() {
  const [number, setNumber] = useState("");
  const [response, setResponse] = useState(null);
  const hostname = process.env.REACT_APP_HOSTNAME || "Unknown Hostname";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://backend-ALB-1-1672505141.us-east-1.elb.amazonaws.com/submit-number/",
        {
          number: parseInt(number),
        }
      );
      setResponse(result.data.received_number);
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
      {response && <p>The number you entered is: {response}</p>}

      <div>
        <h1>Hello World from {hostname}</h1>
      </div>
    </div>
  );
}

export default App;
