import React, { useState } from "react";
import axios from "axios";

function App() {
  const [number, setNumber] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://internal-backend-ALB-72765900.us-east-1.elb.amazonaws.com/submit-number/",
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
    </div>
  );
}

export default App;
