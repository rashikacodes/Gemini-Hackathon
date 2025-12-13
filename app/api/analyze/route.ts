import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dbConnect from "@/utils/dbConnect";
import { Report } from "@/models/report.model";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image");

    const latitude = Number(formData.get("latitude"));
    const longitude = Number(formData.get("longitude"));

    if (isNaN(latitude) || isNaN(longitude)) {
      return NextResponse.json(
        { error: "Invalid location data" },
        { status: 400 }
      );
    }

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "Image file is required" },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed" },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image size exceeds 5MB limit" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Image = buffer.toString("base64");

    console.log(base64Image);
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("GEMINI_API_KEY is not set in environment variables");
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `Analyze this garbage bin image and classify the fill level as one of these: LOW, MEDIUM, HIGH, CRITICAL. 

Rules:
- Output exactly ONE word only
- Choose from: LOW, MEDIUM, HIGH, CRITICAL
- No explanation, no emojis, no punctuation`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Image,
          mimeType: file.type,
        },
      },
    ]);

    let text = result.response.text().toUpperCase().trim();

    const levels = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
    const trashLevel = levels.find((lvl) => text.includes(lvl)) ?? "UNKNOWN";

    const reportData = {
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
      trashLevel,
    };

    dbConnect();
    const report = await Report.create(reportData)

    return NextResponse.json({report}, { status: 200 });
  } catch (error) {
    console.error("Gemini analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze image" },
      { status: 500 }
    );
  }
}
