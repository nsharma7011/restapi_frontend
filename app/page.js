"use client"
import { useState } from "react";

export default function Home() {
  const [jsonInput, setJsonInput] = useState('{"data": ["A","C","z"]}');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    setError(null);
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await fetch("https://your-backend-url.com/bfhl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedInput),
      });
      const data = await res.json();
      setResponseData(data);
    } catch (err) {
      setError("Invalid JSON input or API error");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>ABCD123</h1>
      <input
        type="text"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter JSON request"
        style={{ width: "300px", padding: "10px", marginBottom: "10px" }}
      />
      <br />
      <button onClick={handleSubmit} style={{ padding: "10px 20px", cursor: "pointer" }}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {responseData && (
        <>
          <br />
          <select
            multiple
            value={selectedOptions}
            onChange={(e) => setSelectedOptions([...e.target.selectedOptions].map(o => o.value))}
            style={{ width: "300px", padding: "10px", marginTop: "10px" }}
          >
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_alphabet">Highest Alphabet</option>
          </select>
          <br />
          <div style={{ border: "1px solid #ddd", padding: "10px", marginTop: "10px" }}>
            {selectedOptions.includes("alphabets") && (
              <p><strong>Alphabets:</strong> {JSON.stringify(responseData.alphabets)}</p>
            )}
            {selectedOptions.includes("numbers") && (
              <p><strong>Numbers:</strong> {JSON.stringify(responseData.numbers)}</p>
            )}
            {selectedOptions.includes("highest_alphabet") && (
              <p><strong>Highest Alphabet:</strong> {JSON.stringify(responseData.highest_alphabet)}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
