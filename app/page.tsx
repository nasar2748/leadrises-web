"use client";

import React, { useState } from 'react';

export default function LeadRisesDashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>("");

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const uploadAndAnalyze = async () => {
    if (!file) return alert("Please select a file.");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/resume/upload-and-score`, {
        method: "POST",
        body: formData,
      });
      const resData = await response.json();
      
      if (resData.status === "success") {
        setAtsScore(resData.data.parsed_json.score);
        setFeedback(resData.data.parsed_json.feedback);
      } else {
        alert("Error analyzing resume.");
      }
    } catch (err) {
      console.error("Analysis error:", err);
      alert("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: '800px', margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>LeadRises Dashboard</h1>
      <div style={{ margin: '1rem 0', padding: '1rem', border: '1px solid #ccc' }}>
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <button onClick={uploadAndAnalyze} disabled={loading} style={{ marginLeft: '1rem' }}>
          {loading ? "Analyzing..." : "Upload & Score"}
        </button>
      </div>
      
      {atsScore !== null && (
        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f0f0f0' }}>
          <h2>ATS Score: {atsScore}/100</h2>
          <h3>Feedback:</h3>
          <p>{feedback}</p>
        </div>
      )}
    </main>
  );
}