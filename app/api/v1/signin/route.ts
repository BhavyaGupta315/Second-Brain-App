import Users from "@/models/Users";
import { NextRequest } from "next/server";
import * as jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbconnect";

interface userSchema{
    username : string,
    password : string
}


export async function POST(req : NextRequest){
    const body : userSchema = await req.json();
    // console.log(body);
    const username = body.username;
    const password = body.password;
    dbConnect();
    try{
        const user = await Users.findOne({
            username : username,
            password : password
        });
        if(!user){
            return new Response(JSON.stringify({message : "Wrong email password"}),{
                status : 403,
                headers : { "Content-Type": "application/json" }
            });
        }
        const userId = user._id;

        if (!process.env.JWT_SECRET) {
            throw new Error("Missing JWT_SECRET in environment variables");
        }
        
        const JWT_SECRET: string = process.env.JWT_SECRET;
        const jwtToken = jwt.sign({userId : userId.toString()}, JWT_SECRET);
        return new Response(JSON.stringify({token : jwtToken}),{
            status : 200,
            headers : { "Content-Type": "application/json" }
        });

    }catch(err){
        return new Response(JSON.stringify({message : err}),{
            status : 500,
            headers : { "Content-Type": "application/json" }
        });
    }
}
