"use client";

import React, { useState } from 'react';

export default function LeadRisesDashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [atsScore, setAtsScore] = useState<number | null>(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const uploadAndAnalyze = async () => {
    if (!file) return alert("Please select a file.");
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", "demo-user");

    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/resume/upload-and-score`, {
        method: "POST",
        body: formData,
      });
      const resData = await response.json();
      if (resData.status === "success") {
        setAtsScore(resData.parsed_json.score);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>LeadRises Dashboard</h1>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={uploadAndAnalyze} disabled={loading}>
        {loading ? "Analyzing..." : "Upload & Score"}
      </button>
      {atsScore !== null && <h2>ATS Score: {atsScore}</h2>}
    </main>
  );
}