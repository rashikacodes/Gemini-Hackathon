"use client";

import React, { useEffect, useMemo, useRef } from "react";

type Report = {
  _id: string;
  trashLevel: "Low" | "Medium" | "High" | "Critical";
  latitude: number;
  longitude: number;
  timestamp: string;
  imageUrl?: string;
};

type MapProps = {
  reports: Report[];
  filter: string;
};

export default function Map({ reports, filter }: MapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerLayerRef = useRef<any>(null);

  const filteredReports = useMemo(() => {
    return filter === "All"
      ? reports
      : reports.filter((r) => r.trashLevel === filter);
  }, [reports, filter]);

  const userMarkerRef = useRef<any>(null);
  const accuracyCircleRef = useRef<any>(null);
  const geoWatchIdRef = useRef<number | null>(null);
  const hasCenteredRef = useRef<boolean>(false);

  // Ensure Leaflet CSS is loaded (from CDN)
  useEffect(() => {
    if (typeof document === "undefined") return;
    const cssHref = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    if (!document.querySelector(`link[href="${cssHref}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = cssHref;
      document.head.appendChild(link);
    }
  }, []);

  // Load Leaflet script and initialize map
  useEffect(() => {
    if (typeof window === "undefined") return;

    const initMap = () => {
      const L = (window as any).L;
      if (!L || !mapRef.current) return;

      if (!mapInstanceRef.current) {
        mapInstanceRef.current = L.map(mapRef.current).setView(
          [28.6, 77.2],
          12
        );

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
        }).addTo(mapInstanceRef.current);

        markerLayerRef.current = L.layerGroup().addTo(mapInstanceRef.current);
      }
    };

    if (!(window as any).L) {
      const scriptId = "leaflet-js-cdn";
      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        script.async = true;
        script.onload = () => initMap();
        document.body.appendChild(script);
      } else {
        // script exists but L might not be ready yet
        const attemptInit = () => {
          if ((window as any).L) initMap();
          else setTimeout(attemptInit, 50);
        };
        attemptInit();
      }
    } else {
      initMap();
    }

    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (_) { }
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers when filteredReports change
  useEffect(() => {
    const L = (window as any).L;
    if (!L || !mapInstanceRef.current || !markerLayerRef.current) return;

    markerLayerRef.current.clearLayers();

    if (filteredReports.length === 0) return;

    const markers: any[] = [];
    filteredReports.forEach((r) => {
      const color = getColor(r.trashLevel);

      // Create marker with appropriate size based on trash level
      const radius = r.trashLevel === "Critical" ? 12 :
        r.trashLevel === "High" ? 10 :
          r.trashLevel === "Medium" ? 8 : 6;

      const marker = L.circleMarker([r.latitude, r.longitude], {
        radius: radius,
        fillColor: color,
        color: "#fff",
        weight: 2,
        fillOpacity: 0.8,
      })
        .bindPopup(
          `
          <div class="p-1 font-sans">
            <div class="flex items-center gap-2 mb-2">
              <span class="w-2 h-2 rounded-full" style="background-color: ${color}"></span>
              <strong style="color: ${color}; font-size: 14px; letter-spacing: 0.5px;">${r.trashLevel.toUpperCase()}</strong>
            </div>
            ${r.imageUrl ? `
            <div class="mb-3 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 aspect-video w-full relative">
              <img src="${r.imageUrl}" alt="Report Image" class="w-full h-full object-cover" onerror="this.style.display='none'" />
            </div>
            ` : ''}
            <div class="space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
              <div class="flex items-center gap-1.5">
                <span>📍</span>
                <span class="font-mono text-[10px]">${r.latitude.toFixed(4)}, ${r.longitude.toFixed(4)}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span>🕒</span>
                <span class="font-medium">${new Date(r.timestamp).toLocaleString()}</span>
              </div>
            </div>
          </div>
        `,
          {
            className: "custom-popup-premium",
            closeButton: false,
            minWidth: 220,
            maxWidth: 260
          }
        )
        .addTo(markerLayerRef.current);

      markers.push([r.latitude, r.longitude]);
    });

    // Fit bounds to markers
    try {
      if (markers.length > 0) {
        mapInstanceRef.current.fitBounds(markers as any, {
          padding: [40, 40],
          maxZoom: 15,
        });
      }
    } catch (_) { }
  }, [filteredReports]);

  // Watch user geolocation and show live marker
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const L = (window as any).L;
    if (!L || !mapInstanceRef.current) return;

    if (!("geolocation" in navigator)) return;

    const success = (pos: GeolocationPosition) => {
      const { latitude, longitude, accuracy } = pos.coords;

      try {
        if (!userMarkerRef.current) {
          userMarkerRef.current = L.circleMarker([latitude, longitude], {
            radius: 8,
            fillColor: "#2563eb",
            color: "#fff",
            weight: 2,
            fillOpacity: 1,
          }).addTo(mapInstanceRef.current);

          accuracyCircleRef.current = L.circle([latitude, longitude], {
            radius: Math.max(accuracy || 10, 10),
            color: "#60a5fa",
            fillColor: "#60a5fa",
            fillOpacity: 0.15,
            weight: 0,
          }).addTo(mapInstanceRef.current);
        } else {
          userMarkerRef.current.setLatLng([latitude, longitude]);
          if (accuracyCircleRef.current)
            accuracyCircleRef.current
              .setLatLng([latitude, longitude])
              .setRadius(Math.max(accuracy || 10, 10));
        }

        // Center map on first fix
        if (!hasCenteredRef.current) {
          try {
            mapInstanceRef.current.setView([latitude, longitude], 15);
          } catch (_) { }
          hasCenteredRef.current = true;
        }
      } catch (_) { }
    };

    const error = (err: GeolocationPositionError) => {
      // Silently ignore geolocation errors for now
      console.warn("Geolocation error", err);
    };

    const id = navigator.geolocation.watchPosition(success, error, {
      enableHighAccuracy: true,
      maximumAge: 5000,
      timeout: 10000,
    });
    geoWatchIdRef.current = id;

    return () => {
      if (geoWatchIdRef.current != null) {
        try {
          navigator.geolocation.clearWatch(geoWatchIdRef.current);
        } catch (_) { }
        geoWatchIdRef.current = null;
      }

      try {
        if (userMarkerRef.current) {
          userMarkerRef.current.remove();
          userMarkerRef.current = null;
        }
        if (accuracyCircleRef.current) {
          accuracyCircleRef.current.remove();
          accuracyCircleRef.current = null;
        }
      } catch (_) { }
    };
  }, [mapInstanceRef.current]);

  const getColor = (level: string) => {
    switch (level) {
      case "Low":
        return "#0ea5a4";
      case "Medium":
        return "#7c3aed";
      case "High":
        return "#fb923c";
      case "Critical":
        return "#ef4444";
      default:
        return "#94a3b8";
    }
  };

  return (
    <div className="w-full h-full bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden relative border border-border shadow-xl">
      <div
        ref={mapRef}
        className="w-full h-[calc(100vh-5rem)] z-0"
        style={{ minHeight: 300 }}
      />

      {/* Floating Stats Card */}
      <div className="absolute top-4 right-4 z-[400]">
        <div className="bg-background/80 backdrop-blur-md border border-border/50 rounded-xl px-4 py-3 shadow-lg flex items-center gap-3 transition-all hover:bg-background/90 hover:scale-105">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Live Reports</span>
            <span className="text-lg font-bold text-foreground leading-none">{filteredReports.length}</span>
          </div>
        </div>
      </div>

      {/* Empty State Overlay */}
      {filteredReports.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[400] bg-background/5">
          <div className="text-center space-y-4 p-8 bg-background/80 backdrop-blur-md rounded-2xl border border-border shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="text-5xl mb-2">🗺️</div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">No reports found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your filters or location
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
