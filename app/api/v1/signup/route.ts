import { NextRequest } from "next/server";
import { z } from "zod";
import dbConnect from "@/lib/dbconnect";
import User from "@/models/Users";
import jwt from "jsonwebtoken";

const userSchema = z.object({
    username : z.string()
                .min(3, "Username must be atleast 3 characters long")
                .max(20, "Username must be atmost 20 characters long"),
    password : z.string()
                .min(8, "Password must be at least 8 characters long")
                .max(20, "Password must be at most 20 characters long")
                .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
                .regex(/[a-z]/, "Password must contain at least one lowercase letter")
                .regex(/\d/, "Password must contain at least one number")
                .regex(/[@$!%*?&^#]/, "Password must contain at least one special character (@, $, !, %, *, ?, &, ^, #)")
});

interface UserSchema {
    username : string,
    password : string
}

export async function POST(req : NextRequest){
    const body : UserSchema = await req.json();
    try {
        const zodCheck = userSchema.safeParse(body);
        if(!zodCheck.success){
            return new Response(JSON.stringify({error : "zod Error", message : zodCheck.error.errors}),{
                status : 411,
                headers : { "Content-Type": "application/json" } 
            })
        }
        const username = body.username;
        const password = body.password;  
        await dbConnect();
        const user = await User.findOne({
            username : username
        });
        if(user){
            return new Response(JSON.stringify({message : "User already exists with this username"}),{
                status : 403,
                headers : { "Content-Type": "application/json" }
            });
        }
        const userCreated = await User.create({
            username : username,
            password : password
        });
        const userId = userCreated._id;
        const JWT_SECRET = process.env.JWT_SECRET;
        if(!JWT_SECRET){
            throw new Error("No JWT Secret Present");
        }
        const jwtToken = jwt.sign({userId : userId.toString()}, JWT_SECRET);
        return new Response(JSON.stringify({message : "Signed up", token : jwtToken}),{
            status : 200,
            headers : { "Content-Type": "application/json" }
        }); 
    }catch(err){
        console.log(err);
        return new Response(JSON.stringify({message : err}),{
            status : 500,
            headers : { "Content-Type": "application/json" }
        });
    }
    
}

/*
{
    username : "bhavya",
    password : "123"
}
    Username should be between 3 and 10 letters
    Password should be between 8 to 20 letters, one uppercase, one lowercase, one special character and one number

    1. Status 200 - Signed up 
    2. Status 411 - Error in inputs
    3. Status 403 -  User already exists with this username
    4. Status 500 - Server error
*/