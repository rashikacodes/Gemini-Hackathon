import { User } from "@/models/user.models";
import dbConnect from "@/utils/dbConnect";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt, { SignOptions } from "jsonwebtoken"

export async function POST(req: NextRequest) {

try {
        await dbConnect()
        const {password, username} = await req.json();
        if(!username || !password){
            return NextResponse.json({success: false, message: "Username and password are required"}, {status: 400});
        }

    
        const user = await User.findOne({username})
    
        if(!user){
            return NextResponse.json({success: false, message: "Invalid username"}, {status: 401})
        }
    
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
    
        if(!isPasswordCorrect){
            return NextResponse.json({success: false, message: "Invalid password"}, {status: 401})
        }

        //now distributing the token through cookies
        const payload = {
            _id: user._id,
            username: user.username,
            email: user.email
        }

        const key = process.env.JWT_SECRET_TOKEN as string;

        if(!key){
            throw new Error("JWT_SECRET_TOKEN is not defined");
        }
        
        const expiresIn = {
            expiresIn: '5d' as SignOptions['expiresIn']
        } 

        const token = jwt.sign(payload, key, expiresIn)
        
    
        const response =  NextResponse.json(
            {success: true, message: "Login successful", user}, {status: 200}
        )

        response.cookies.set("token", token, {
            httpOnly: true,
            maxAge: 5 * 24 * 60 * 60,
        })

        return response
} catch (error) {
    console.error(error)
    return NextResponse.json({success: false, message: "Internal Server Error"}, {status: 500});
}
}
