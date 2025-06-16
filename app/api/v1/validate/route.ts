import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req : NextRequest){
    const token = req.nextUrl.searchParams.get("token");
    if (!token) {
        return NextResponse.json({ error: "Token missing" }, { status: 400 });
    }
    const JWT_SECRET = process.env.JWT_SECRET; 
    try {
        if(!JWT_SECRET){
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        console.log(JWT_SECRET);
        const decoded = jwt.verify(token, JWT_SECRET) as {userId  : string};
        return NextResponse.json({ check: true, userId: decoded.userId as string });
    } catch (err) {
        console.log("Here comes - ", err);
        return NextResponse.json({ check: false });
    }
}