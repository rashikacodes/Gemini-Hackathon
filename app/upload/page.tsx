"use client"

import type React from "react"
import { useState } from "react"
import { Upload, MapPin, Loader2, CheckCircle2, AlertCircle, ImageIcon } from 'lucide-react'

export default function UploadPage() {
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>("")
  const [status, setStatus] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [latLng, setLatLng] = useState<{ lat: number; lng: number } | null>(null)
  const [locationLoading, setLocationLoading] = useState(false)

  // 📸 Handle file selection or drop
  const handleImageSelect = (file: File | null) => {
    setImage(file || null)
    setSuccess(false)
    if (file) {
      setPreview(URL.createObjectURL(file))
    } else {
      setPreview("")
    }
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageSelect(e.target.files?.[0] || null)
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    handleImageSelect(file || null)
  }

  // 📍 Auto-detect location
  const detectLocation = () => {
    if (!navigator.geolocation) {
      setStatus("⚠️ Geolocation not supported by your browser")
      return
    }

    setLocationLoading(true)
    setStatus("📍 Fetching your location...")

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatLng({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        })
        setStatus("✓ Location detected successfully!")
        setLocationLoading(false)
      },
      (error) => {
        setStatus("⚠️ Failed to get location. Please enable location services.")
        setLocationLoading(false)
      },
    )
  }

  // 🚀 Submit form
  const submitHandler = async () => {
    if (!image) {
      setStatus("⚠️ Please upload an image first")
      return
    }
    if (!latLng) {
      setStatus("⚠️ Please add your location before submitting")
      return
    }

    setLoading(true)
    setSuccess(false)
    setStatus("🤖 Analyzing image with Gemini Vision AI...")

    const formData = new FormData()
    formData.append("image", image)
    formData.append("latitude", latLng.lat.toString())
    formData.append("longitude", latLng.lng.toString())

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()

      if (res.ok) {
        setStatus(`✨ AI Analysis Complete: ${data.report.trashLevel} level detected`)
        setSuccess(true)
      } else {
        setStatus(`❌ ${data.error || "Something went wrong"}`)
      }
    } catch (err) {
      setStatus("❌ Network error. Please try again.")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5 py-12 px-6">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
            <Upload className="w-4 h-4" />
            <span>AI-Powered Waste Detection</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Report <span className="text-primary">Waste Bin</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Upload a photo of any garbage bin and let{" "}
            <span className="font-semibold text-primary">Gemini Vision AI</span> analyze its fill level instantly.
          </p>
        </div>

        {/* Upload Card */}
        <div
          className="bg-card rounded-2xl shadow-xl border border-border p-8 space-y-6 hover:shadow-2xl transition-all duration-300"
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {/* Drag & Drop Box */}
          <div className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-300 group">
            <input type="file" accept="image/*" onChange={onFileChange} className="hidden" id="fileInput" />

            {!preview ? (
              <label htmlFor="fileInput" className="cursor-pointer space-y-4 block">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ImageIcon className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-medium text-foreground">Drag & Drop or Click to Upload</p>
                  <p className="text-sm text-muted-foreground">Supported formats: JPG, PNG, JPEG</p>
                </div>
              </label>
            ) : (
              <div className="space-y-4">
                <img
                  src={preview || "/placeholder.svg"}
                  alt="Preview"
                  className="max-h-64 mx-auto rounded-lg border-2 border-border object-contain"
                />
                <label htmlFor="fileInput" className="text-sm text-primary hover:underline cursor-pointer">
                  Change Image
                </label>
              </div>
            )}
          </div>

          {/* Location Button */}
          <button
            onClick={detectLocation}
            disabled={locationLoading}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
          >
            {locationLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Detecting Location...
              </>
            ) : (
              <>
                <MapPin className="w-5 h-5" />
                Add Current Location
              </>
            )}
          </button>

          {latLng && (
            <div className="flex items-center gap-2 p-4 rounded-lg bg-primary/10 border border-primary/20">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Location Added</p>
                <p className="text-xs text-muted-foreground">
                  {latLng.lat.toFixed(6)}, {latLng.lng.toFixed(6)}
                </p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={submitHandler}
            disabled={loading || !image || !latLng}
            className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-2xl hover:shadow-primary/20 hover:scale-105"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Upload & Analyze
              </>
            )}
          </button>

          {/* Status Message */}
          {status && (
            <div
              className={`flex items-start gap-3 p-4 rounded-lg ${
                success
                  ? "bg-primary/10 border border-primary/20"
                  : status.includes("⚠️") || status.includes("❌")
                    ? "bg-destructive/10 border border-destructive/20"
                    : "bg-accent/10 border border-accent/20"
              }`}
            >
              {success ? (
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              ) : status.includes("⚠️") || status.includes("❌") ? (
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              ) : (
                <Loader2 className="w-5 h-5 text-accent animate-spin flex-shrink-0 mt-0.5" />
              )}
              <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">{status}</p>
            </div>
          )}

          {/* Powered by Badge */}
          <div className="text-center pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Powered by <span className="font-semibold text-primary">Gemini 2.5 Flash Vision AI</span>
            </p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-sm font-semibold text-foreground">92% Accuracy</div>
            <div className="text-xs text-muted-foreground mt-1">Precise AI detection</div>
          </div>

          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-sm font-semibold text-foreground">Instant Analysis</div>
            <div className="text-xs text-muted-foreground mt-1">Results in seconds</div>
          </div>

          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <div className="text-2xl mb-2">🗺️</div>
            <div className="text-sm font-semibold text-foreground">Live Tracking</div>
            <div className="text-xs text-muted-foreground mt-1">Real-time dashboard</div>
          </div>
        </div>
      </div>
    </div>
  )
}