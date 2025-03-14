import { NextRequest } from "next/server";
import dbConnect from "@/lib/dbconnect";
import * as jwt from "jsonwebtoken";
import Link from "@/models/Link";

export async function POST(req : NextRequest){
    try {
        const headers : (string | null)= req.headers.get("authorization");
        if(headers == null){
            return new Response(JSON.stringify({message : "Authorization header not present"}),{
                status : 403,
                headers : { "Content-Type": "application/json" }
            });
        }
        const decoded = jwt.verify(headers, process.env.JWT_SECRET || "");
        const userId = (decoded as {userId : string}).userId;
        dbConnect();
        const body : {share : boolean} = await req.json();
        if(!body.share){
            await Link.deleteOne({
                userId : userId
            });
            return new Response(JSON.stringify({message : "Link unshared"}),{
                status : 200,
                headers : { "Content-Type": "application/json" }
            });
        }
        const find = await Link.findOne({
            userId : userId
        });
        if(find){
            return new Response(JSON.stringify({message : "Link already shared", hash : find["hash"]}),{
                status : 200,
                headers : { "Content-Type": "application/json" }
            });
        }
        const hash = Math.random().toString(36).substring(7);
        const link = await Link.create({     
            hash : hash,
            userId : userId
        });
        console.log(link);
        return new Response(JSON.stringify({message : "Link shared",
            link
        }),{
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
