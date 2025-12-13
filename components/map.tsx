"use client"

import { useMemo } from "react"

type Report = {
  _id: string
  trashLevel: "Low" | "Medium" | "High" | "Critical"
  latitude: number
  longitude: number
  timestamp: string
}

type MapProps = {
  reports: Report[]
  filter: string
}

export default function Map({ reports, filter }: MapProps) {
  // Filter reports based on selected filter
  const filteredReports = useMemo(() => {
    return filter === "All" ? reports : reports.filter((r) => r.trashLevel === filter)
  }, [reports, filter])

  // Calculate map bounds and scale
  const { minLat, maxLat, minLng, maxLng, points } = useMemo(() => {
    if (filteredReports.length === 0) {
      return {
        minLat: 28.5,
        maxLat: 28.7,
        minLng: 77.1,
        maxLng: 77.3,
        points: [],
      }
    }

    const lats = filteredReports.map((r) => r.latitude)
    const lngs = filteredReports.map((r) => r.longitude)

    const minLat = Math.min(...lats)
    const maxLat = Math.max(...lats)
    const minLng = Math.min(...lngs)
    const maxLng = Math.max(...lngs)

    // Add padding
    const latPadding = (maxLat - minLat) * 0.1 || 0.05
    const lngPadding = (maxLng - minLng) * 0.1 || 0.05

    // Convert lat/lng to SVG coordinates
    const width = 1000
    const height = 600

    const points = filteredReports.map((report) => {
      const x = ((report.longitude - (minLng - lngPadding)) / (maxLng + lngPadding - (minLng - lngPadding))) * width
      const y =
        height - ((report.latitude - (minLat - latPadding)) / (maxLat + latPadding - (minLat - latPadding))) * height

      return {
        ...report,
        x,
        y,
      }
    })

    return {
      minLat: minLat - latPadding,
      maxLat: maxLat + latPadding,
      minLng: minLng - lngPadding,
      maxLng: maxLng + lngPadding,
      points,
    }
  }, [filteredReports])

  // Color mapping for trash levels
  const getColor = (level: string) => {
    switch (level) {
      case "Low":
        return "hsl(var(--primary))"
      case "Medium":
        return "hsl(var(--accent))"
      case "High":
        return "hsl(var(--secondary))"
      case "Critical":
        return "hsl(var(--destructive))"
      default:
        return "hsl(var(--muted))"
    }
  }

  return (
    <div className="w-full h-full bg-muted/10 rounded-lg overflow-hidden relative">
      {/* Grid Background */}
      <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
        {/* Background */}
        <rect width="1000" height="600" fill="hsl(var(--background))" />

        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="1000" height="600" fill="url(#grid)" />

        {/* Map markers */}
        {points.map((point, index) => {
          const color = getColor(point.trashLevel)
          return (
            <g key={point._id}>
              {/* Pulse animation ring */}
              <circle cx={point.x} cy={point.y} r="20" fill={color} opacity="0.2">
                <animate
                  attributeName="r"
                  from="20"
                  to="35"
                  dur="2s"
                  begin={`${index * 0.2}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.3"
                  to="0"
                  dur="2s"
                  begin={`${index * 0.2}s`}
                  repeatCount="indefinite"
                />
              </circle>

              {/* Main marker */}
              <circle
                cx={point.x}
                cy={point.y}
                r="12"
                fill={color}
                stroke="white"
                strokeWidth="3"
                className="cursor-pointer hover:r-16 transition-all"
              >
                <title>
                  {point.trashLevel} Level{"\n"}
                  Location: {point.latitude.toFixed(4)}, {point.longitude.toFixed(4)}
                  {"\n"}
                  {new Date(point.timestamp).toLocaleString()}
                </title>
              </circle>

              {/* Icon */}
              <text
                x={point.x}
                y={point.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="12"
                fill="white"
                pointerEvents="none"
              >
                🗑️
              </text>
            </g>
          )
        })}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-lg">
        <div className="text-sm font-semibold text-foreground mb-3">Trash Levels</div>
        <div className="space-y-2">
          {["Low", "Medium", "High", "Critical"].map((level) => (
            <div key={level} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: getColor(level) }}
              />
              <span className="text-xs text-muted-foreground">{level}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Coordinates Display */}
      <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm border border-border rounded-lg px-3 py-2 shadow-lg">
        <div className="text-xs text-muted-foreground">
          Viewing Area: {minLat.toFixed(2)}° - {maxLat.toFixed(2)}° N, {minLng.toFixed(2)}° - {maxLng.toFixed(2)}° E
        </div>
      </div>

      {/* No Data Message */}
      {filteredReports.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="text-4xl">📍</div>
            <p className="text-muted-foreground font-medium">No reports found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
          </div>
        </div>
      )}
    </div>
  )
}