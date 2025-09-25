import { useState } from "react";

function App() {
  const [code, setCode] = useState("");
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setReview(null);
    setError(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();

      if (data.review) {
        // Pretty print the JSON review
        setReview(JSON.stringify(data.review, null, 2));
      } else if (data.error) {
        setError(data.error);
      } else {
        setError("Unknown error occurred");
      }
    } catch (err) {
      setError("❌ Error fetching review: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "50px auto",
        fontFamily: "sans-serif",
      }}
    >
      <h1>⚡ AI Code Reviewer</h1>

      <textarea
        rows={12}
        cols={80}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here..."
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "14px",
          borderRadius: "8px",
        }}
      />
      <br />

      <button
        onClick={handleSubmit}
        disabled={loading || !code.trim()}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          background: "#2563eb",
          color: "white",
          cursor: "pointer",
        }}
      >
        {loading ? "Reviewing..." : "Review Code"}
      </button>

      {error && (
        <pre
          style={{
            color: "red",
            marginTop: "20px",
            background: "#fdd",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          {error}
        </pre>
      )}

      {review && (
        <pre
          style={{
            background: "#f4f4f4",
            padding: "20px",
            marginTop: "20px",
            borderRadius: "8px",
            whiteSpace: "pre-wrap",
          }}
        >
          {review}
        </pre>
      )}
    </div>
  );
}

export default App;
