"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Map from "../../components/map";


export default function DashboardPage() {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState("All");
  const [autoRefresh, setAutoRefresh] = useState(true);

  // FETCH DATA
  const loadReports = () => {
    fetch("/api/reports")
      .then((res) => res.json())
      .then((data) => setReports(data));
  };

  // AUTO REFRESH EVERY 5 SEC
  useEffect(() => {
    loadReports();
    if (autoRefresh) {
      const interval = setInterval(loadReports, 5000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  // STATISTICS
  const stats = {
    total: reports.length,
    low: reports.filter((r) => r.trashLevel === "Low").length,
    medium: reports.filter((r) => r.trashLevel === "Medium").length,
    high: reports.filter((r) => r.trashLevel === "High").length,
    critical: reports.filter((r) => r.trashLevel === "Critical").length,
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">

      {/* SIDEBAR */}
      <div className="w-72 bg-gray-800 p-5 border-r border-gray-700 flex flex-col justify-between">

        {/* Filters */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-green-400">
            Filters
          </h2>

          {["All", "Low", "Medium", "High", "Critical"].map((lvl) => (
            <button
              key={lvl}
              className={`w-full py-2 rounded-lg mb-2 font-medium
                ${filter === lvl ? "bg-green-500" : "bg-gray-700 hover:bg-gray-600"}
              `}
              onClick={() => setFilter(lvl)}
            >
              {lvl}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-3 text-blue-400">
            Statistics
          </h2>

          <p>Total Bins: {stats.total}</p>
          <p className="text-green-400">Low: {stats.low}</p>
          <p className="text-yellow-400">Medium: {stats.medium}</p>
          <p className="text-orange-400">High: {stats.high}</p>
          <p className="text-red-500 font-bold">Critical: {stats.critical}</p>
        </div>

        {/* Auto Refresh Toggle */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-3 text-purple-400">
            Auto Refresh
          </h2>

          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className="w-full bg-gray-700 hover:bg-gray-600 py-2 rounded-lg"
          >
            {autoRefresh ? "Stop Refresh" : "Enable Auto Refresh"}
          </button>
        </div>
      </div>

      {/* MAP */}
      <div className=" h-[90vh] p-5 w-[80vw] bg-white">
        <Map reports={reports} filter={filter} />
      </div>
    </div>
  );
}
