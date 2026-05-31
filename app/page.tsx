"use client";

import React, { useState } from 'react';

export default function LeadRisesDashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<any>(null);
  const [jobDescription, setJobDescription] = useState<string>("");
  const [optimizedOutput, setOptimizedOutput] = useState<string>("");

  // This helper pulls the URL from your .env.local file
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const uploadAndAnalyze = async () => {
    if (!file) return alert("Please select a valid PDF file first.");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", "demo-authenticated-user-id");

    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/resume/upload-and-score`, {
        method: "POST",
        body: formData,
      });
      const resData = await response.json();
      if (resData.status === "success") {
        setAtsScore(resData.data.parsed_json.score);
        setFeedback(resData.data.parsed_json.feedback);
      }
    } catch (err) {
      console.error("Analysis transmission error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    // ... rest of the code remains the same ...
    // Make sure the "Optimize to Target Profile" button uses the same ${BACKEND_URL} logic!
    // Inside that button's onClick:
    // const response = await fetch(`${BACKEND_URL}/api/v1/resume/optimize`, { ... });
  );
}