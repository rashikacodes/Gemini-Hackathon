"use client";

import React, { useState } from "react";

export default function UploadPage() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [latLng, setLatLng] = useState<{ lat: number; lng: number } | null>(
    null
  );

  // 📸 Handle file selection or drop
  const handleImageSelect = (file: File | null) => {
    setImage(file || null);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageSelect(e.target.files?.[0] || null);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    handleImageSelect(file || null);
  };

  // 📍 Auto-detect location
  const detectLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");

    setStatus("📍 Fetching location...");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatLng({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setStatus("📍 Location added!");
      },
      () => setStatus("⚠️ Failed to get location")
    );
  };

  // 🚀 Submit form
  const submitHandler = async () => {
    if (!image) return setStatus("⚠️ Upload an image first.");
    if (!latLng) return setStatus("⚠️ Add location before submitting.");

    setLoading(true);
    setStatus("🤖 Analyzing image with Gemini AI...");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("latitude", latLng.lat.toString());
    formData.append("longitude", latLng.lng.toString());

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setStatus(`✨ AI Result: ${data.trashLevel}`);
    } catch (err) {
      setStatus("❌ Something went wrong while uploading.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-6 py-10">
      <h1 className="text-4xl font-bold text-green-400 mb-3">
        Report Waste Bin
      </h1>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        Upload a photo of any garbage bin and let <b>Gemini Vision AI</b> detect
        how full it is.
      </p>

      <div
        className="bg-gray-800 w-full max-w-md p-6 rounded-xl shadow-xl border border-gray-700 hover:border-green-400 hover:-translate-y-1 duration-100 transition"
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {/* Drag & Drop Box */}
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-green-400 transition">
          <input
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="hidden"
            id="fileInput"
          />

          {!preview ? (
            <label htmlFor="fileInput" className="cursor-pointer text-gray-300">
              <p className="text-lg mb-2">📸 Drag & Drop or Click to Upload</p>
              <p className="text-sm text-gray-500">
                Supported formats: JPG, PNG, JPEG
              </p>
            </label>
          ) : (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg border border-gray-700"
            />
          )}
        </div>

        {/* Location */}
        <button
          onClick={detectLocation}
          className="w-full mt-5 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg transition font-medium"
        >
          📍 Add Current Location
        </button>

        {latLng && (
          <p className="mt-3 text-center text-green-400">
            Location: {latLng.lat.toFixed(5)}, {latLng.lng.toFixed(5)}
          </p>
        )}

        {/* Submit */}
        <button
          onClick={submitHandler}
          className="w-full mt-6 bg-green-500 hover:bg-green-600 py-2 rounded-lg text-lg font-medium transition"
          disabled={loading}
        >
          {loading ? "⏳ Analyzing…" : "Upload & Analyze"}
        </button>

        {/* Status message */}
        {status && (
          <p className="mt-6 text-center text-gray-300 whitespace-pre-line">
            {status}
          </p>
        )}

        {/* Powered by Gemini Badge */}
        <div className="mt-6 text-xs text-center text-gray-500">
          🔥 Powered by <span className="text-blue-400">Gemini 1.5 Flash Vision</span>
        </div>
      </div>
    </div>
  );
}
