import { Contact } from "@/models/contact.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { name, email, message, location } = await request.json();

    console.log("Contact Form Submission:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);
    console.log("Location:", location);

    if(!name || !email || !message) {
        return NextResponse.json({ success: false, message: "Name, email, and message are required" });
    }

    const contact = await Contact.create({
        name,
        email,
        message,
        location: {
            latitude: location?.latitude || null,
            longitude: location?.longitude || null,
        },
    });

    console.log(contact)

    return NextResponse.json({ success: true, message: "Contact form submitted successfully" });
}