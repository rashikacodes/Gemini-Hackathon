import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import { Report } from "@/models/report.model";

export async function POST(req: NextRequest) {
  try {
    const { lat, lon } = await req.json();

    if (typeof lat !== "number" || typeof lon !== "number") {
      return NextResponse.json(
        { error: "Latitude and Longitude are required as numbers" },
        { status: 400 }
      );
    }

    await dbConnect();

    const reports = await Report.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [lon, lat] },
          $maxDistance: 2000,
        },
      },
    }).lean();

    return NextResponse.json({ success: true, count: reports.length, reports });
  } catch (error) {
    console.error("Error fetching nearby reports:", error);
    return NextResponse.json(
      { error: "Failed to fetch nearby reports" },
      { status: 500 }
    );
  }
}
