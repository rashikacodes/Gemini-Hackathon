"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

type Report = {
  _id: string;
  latitude: number;
  longitude: number;
  trashLevel: string;
  imageBase64: string;
  timestamp: string;
};

const icons: Record<string, L.Icon> = {
  Low: new L.Icon({ iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png", iconSize: [38, 38] }),
  Medium: new L.Icon({ iconUrl: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png", iconSize: [38, 38] }),
  High: new L.Icon({ iconUrl: "https://maps.google.com/mapfiles/ms/icons/orange-dot.png", iconSize: [38, 38] }),
  Critical: new L.Icon({ iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png", iconSize: [38, 38] }),
};

export default function Map({
  reports,
  filter,
}: {
  reports: Report[];
  filter: string;
}) {
  const filteredReports =
    filter === "All"
      ? reports
      : reports.filter((r) => r.trashLevel === filter);

  return (
    <MapContainer
      center={[20.5, 78.9]}
      zoom={5}
      className="w-full h-full rounded-lg"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {filteredReports.map((r) => (
        <Marker
          key={r._id}
          position={[r.latitude, r.longitude]}
          icon={icons[r.trashLevel]}
        >
          <Popup>
            <p><b>Trash Level:</b> {r.trashLevel}</p>
            <p><b>Time:</b> {new Date(r.timestamp).toLocaleString()}</p>
            <img
              src={`data:image/jpeg;base64,${r.imageBase64}`}
              className="w-40 h-32 object-cover rounded mt-2"
            />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
