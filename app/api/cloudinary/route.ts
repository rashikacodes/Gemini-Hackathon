"use server";

import { v2 as cloudinary } from "cloudinary";
import jwtDecode from "@/utils/jwtDecode";
import { NextResponse } from "next/server";

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
	console.error("Cloudinary environment variables are missing");
}

export async function GET() {


	if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
		console.log("Something")
		return NextResponse.json({ success: false, message: "Server configuration error" }, { status: 500 });
	}


	const decoded = await jwtDecode();
    if (!decoded) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

	cloudinary.config({
		cloud_name: CLOUD_NAME,
		api_key: API_KEY,
		api_secret: API_SECRET,
	});
	
	

	const paramsToSign = {
		timestamp: Math.floor(Date.now() / 1000),
		folder: "reports",
	};

	console.log(paramsToSign)

	const signature = cloudinary.utils.api_sign_request(
		paramsToSign,
		API_SECRET as string,
	);


	const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

	return NextResponse.json({
		success: true,
		data: {
			uploadUrl,
			signature: signature,
			apiKey: API_KEY,
			cloudName: CLOUD_NAME,
			timestamp: paramsToSign.timestamp,
			folder: paramsToSign.folder,
		},
	});
}
