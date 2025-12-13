import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import { Report } from "@/models/report.model";

export async function POST(req: NextRequest) {
  try {
    console.log("request received");
    const { lat, lon } = await req.json();

    if (typeof lat !== "number" || typeof lon !== "number") {
      return NextResponse.json(
        { error: "Latitude and Longitude are required as numbers" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Find reports within 2km radius using MongoDB geospatial query
    const reports = await Report.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [lon, lat] },
          $maxDistance: 2000, // 2km in meters
        },
      },
    }).lean();

    // Transform MongoDB documents to frontend format
    const transformedReports = reports.map((report: any) => {
      // MongoDB stores coordinates as [longitude, latitude]
      const [longitude, latitude] = report.location.coordinates;

      // Convert trashLevel from "LOW" to "Low" (Title Case)
      const trashLevelMap: Record<string, string> = {
        LOW: "Low",
        MEDIUM: "Medium",
        HIGH: "High",
        CRITICAL: "Critical",
      };
      const trashLevel = trashLevelMap[report.trashLevel] || report.trashLevel;

      return {
        _id: report._id.toString(),
        latitude,
        longitude,
        trashLevel,
        timestamp: report.createdAt || new Date().toISOString(),
        imageUrl: report["image-url"],
      };
    });

    return NextResponse.json({
      success: true,
      count: transformedReports.length,
      reports: transformedReports,
    });
  } catch (error) {
    console.error("Error fetching nearby reports:", error);
    return NextResponse.json(
      { error: "Failed to fetch nearby reports" },
      { status: 500 }
    );
  }
}
