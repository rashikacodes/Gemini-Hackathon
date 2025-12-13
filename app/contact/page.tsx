"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [location, setLocation] = useState<{
  latitude: number | null;
  longitude: number | null;
}>({
  latitude: null,
  longitude: null,
});

const fetchLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    () => {
      alert("Unable to retrieve your location");
    }
  );
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, location }),
    }).then(res => res.json());
    console.log(res)
    alert("Thank you for contacting us!");
    setFormData({ name: "", email: "", message: "" });
    setLocation({ latitude: null, longitude: null });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card w-full max-w-lg p-8">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-orange-600 text-center">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Have a question or suggestion? We’d love to hear from you.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
          <Input
            label="Your Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Message Field */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300
              focus:outline-none focus:border-orange-400
              focus:ring-2 focus:ring-orange-200 transition"
              placeholder="Write your message here..."
            />
          </div>
        {/* Location Button */}
<div className="flex flex-col gap-2">
  <button
    type="button"
    onClick={fetchLocation}
    className="auth-btn"
  >
    Get My Location
  </button>

  {location.latitude && location.longitude && (
    <p className="text-sm text-gray-600">
      📍 Location detected: <br />
      Lat: {location.latitude.toFixed(4)}, 
      Lng: {location.longitude.toFixed(4)}
    </p>
  )}
</div>

          <Button type="submit">Send Message</Button>
        </form>

        {/* Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Email: gemini.ai@example.com</p>
          <p>Built for Smart Cities & Sustainability 🌱</p>
        </div>
      </div>
    </div>
  );
}
