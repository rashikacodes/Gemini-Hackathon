import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file: File | null = formData.get("image") as unknown as File;

  if (!file) {
    return NextResponse.json({ error: "No image provided" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent([
    {
      inlineData: {
        data: Buffer.from(bytes).toString("base64"),
        mimeType: file.type,
      },
    },
    "Classify garbage bin fill level as: LOW, MEDIUM, HIGH, CRITICAL",
  ]);

  const text = result.response.text();

  return NextResponse.json({ analysis: text });
}
