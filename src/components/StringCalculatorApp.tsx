import { useState } from "react";
import { stringCalculator } from "../utils/stringCalculator";

const StringCalculatorApp = () => {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string | null>("");
  const [result, setResult] = useState<null | number>(null);

  const handleCalculate = () => {
    try {
      setError("");
      const res = stringCalculator(input);
      setResult(res);
    } catch (error: unknown) {
      setError(null);
      setResult(null);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };
  return (
    <>
      {" "}
      <img
        src="https://images.unsplash.com/photo-1594352161389-11756265d1b5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0"
        width={600}
        height={400}
        alt="Banner Image for calculator"
        style={{ width: "100%", height: "auto", borderRadius: "8px" }}
      />
      <h1 style={{ marginTop: "20px" }}>String Calculator</h1>
      <p>Enter a list of numbers separated by commas or newlines.</p>
      <label
        htmlFor="numbers"
        style={{ display: "block", marginTop: "15px", fontWeight: 600 }}
      >
        Numbers: (&lt;=1000)
      </label>
      <textarea
        id="numbers"
        name="numbers"
        rows={4}
        placeholder="e.g. 1,2,3 or 1\n2\n3"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          marginTop: "8px",
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "16px",
          color: "#222",
        }}
      />
      <button
        type="button"
        onClick={handleCalculate}
        style={{
          marginTop: "15px",
          padding: "10px 15px",
          backgroundColor: "#007acc",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Calculate
      </button>
      {result !== null && (
        <p
          style={{
            marginTop: "15px",
            color: "green",
            fontWeight: 600,
          }}
          aria-live="polite"
        >
          Result: {result}
        </p>
      )}
      {error && (
        <div
          style={{
            marginTop: "20px",
            backgroundColor: "#f7f7f7",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ddd",
          }}
        >
          <strong>Note:</strong> {error}.
        </div>
      )}
    </>
  );
};

export default StringCalculatorApp;
