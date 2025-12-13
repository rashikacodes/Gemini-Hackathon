"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Filter, RefreshCw, BarChart3, AlertTriangle } from 'lucide-react'

const Map = dynamic(() => import("@/components/map"), { ssr: false })

type Report = {
  _id: string
  trashLevel: "Low" | "Medium" | "High" | "Critical"
  latitude: number
  longitude: number
  timestamp: string
}

export default function DashboardPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [filter, setFilter] = useState("All")
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  // FETCH DATA
  const loadReports = async () => {
    try {
      const res = await fetch("/api/reports")
      const data = await res.json()
      setReports(data)
      setIsLoading(false)
    } catch (error) {
      console.error("Failed to load reports:", error)
      setIsLoading(false)
    }
  }

  // AUTO REFRESH EVERY 5 SEC
  useEffect(() => {
    loadReports()
    if (autoRefresh) {
      const interval = setInterval(loadReports, 5000)
      return () => clearInterval(interval)
    }
  }, [autoRefresh])

  // STATISTICS
  const stats = {
    total: reports.length,
    low: reports.filter((r) => r.trashLevel === "Low").length,
    medium: reports.filter((r) => r.trashLevel === "Medium").length,
    high: reports.filter((r) => r.trashLevel === "High").length,
    critical: reports.filter((r) => r.trashLevel === "Critical").length,
  }

  const filterLevels = ["All", "Low", "Medium", "High", "Critical"]

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      {/* SIDEBAR */}
      <div className="lg:w-80 bg-card border-r border-border p-6 flex flex-col gap-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary" />
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">Real-time waste monitoring system</p>
        </div>

        {/* Filters */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Filter className="w-4 h-4 text-primary" />
            <span>Filter by Level</span>
          </div>

          <div className="space-y-2">
            {filterLevels.map((lvl) => (
              <button
                key={lvl}
                className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-300 ${
                  filter === lvl
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
                onClick={() => setFilter(lvl)}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-accent" />
            Statistics
          </h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm text-muted-foreground">Total Bins</span>
              <span className="text-lg font-bold text-foreground">{stats.total}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                <div className="text-xs text-muted-foreground mb-1">Low</div>
                <div className="text-2xl font-bold text-primary">{stats.low}</div>
              </div>

              <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                <div className="text-xs text-muted-foreground mb-1">Medium</div>
                <div className="text-2xl font-bold text-accent">{stats.medium}</div>
              </div>

              <div className="p-3 rounded-lg bg-secondary/10 border border-secondary/20">
                <div className="text-xs text-muted-foreground mb-1">High</div>
                <div className="text-2xl font-bold text-secondary">{stats.high}</div>
              </div>

              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <div className="text-xs text-muted-foreground mb-1">Critical</div>
                <div className="text-2xl font-bold text-destructive flex items-center gap-1">
                  {stats.critical}
                  {stats.critical > 0 && <AlertTriangle className="w-4 h-4" />}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Auto Refresh Toggle */}
        <div className="space-y-3 mt-auto">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <RefreshCw className={`w-4 h-4 text-secondary ${autoRefresh ? "animate-spin" : ""}`} />
            Auto Refresh
          </h2>

          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-300 ${
              autoRefresh
                ? "bg-secondary text-secondary-foreground shadow-lg"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {autoRefresh ? "Stop Auto Refresh" : "Enable Auto Refresh"}
          </button>

          {autoRefresh && <p className="text-xs text-muted-foreground text-center">Refreshing every 5 seconds</p>}
        </div>
      </div>

      {/* MAP */}
      <div className="flex-1 relative">
        {isLoading ? (
          <div className="h-full flex items-center justify-center bg-muted/20">
            <div className="text-center space-y-3">
              <RefreshCw className="w-12 h-12 text-primary animate-spin mx-auto" />
              <p className="text-muted-foreground">Loading map data...</p>
            </div>
          </div>
        ) : (
          <div className="h-[calc(100vh-5rem)] w-full">
            <Map reports={reports} filter={filter} />
          </div>
        )}
      </div>
    </div>
  )
}