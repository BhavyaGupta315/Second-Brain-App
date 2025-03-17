import { NextRequest } from "next/server";
import Content from "@/models/Content";
import dbConnect from "@/lib/dbconnect";
import Tag from "@/models/Tags";
import * as jwt from "jsonwebtoken";

interface ContentSchema{
    "link" : string,
    "type" : 'image'| 'article'| 'video' | 'audio',
    "title" : string,
    "tags" : string[],
}

export async function POST(req : NextRequest){
    try{
        const body : ContentSchema = await req.json();
        dbConnect();

        const tagsAdded = body.tags || [];  
        const tagIds = [];

        for (let i = 0; i < tagsAdded.length; i++) {
            const tagName = tagsAdded[i];
            const tag = await Tag.findOneAndUpdate(
                { title: tagName },
                { $setOnInsert: { title: tagName } },
                { upsert: true, new: true }
            );

            tagIds.push(tag._id);
        }

        // Ensure body.tags is now an array of ObjectIds
        body.tags  = tagIds;
        const headers : (string | null)= req.headers.get("authorization");
        if(headers == null){
            return new Response(JSON.stringify({message : "Authorization header not present"}),{
                status : 403,
                headers : { "Content-Type": "application/json" }
            });
        }
        const decoded = jwt.verify(headers, process.env.JWT_SECRET || "");
        const userId = (decoded as {userId : string}).userId;
        const content = await Content.create({
            ...body,
            userId : userId
        }); 
        console.log(content);
        return new Response(JSON.stringify(content), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    }catch(err){
        return new Response(JSON.stringify({message : err}),{
            status : 500,
            headers : { "Content-Type": "application/json" }
        });
    }
}

export async function GET(req : NextRequest){
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
    try{
        const content = await Content.find({
            userId : userId
        }).populate("userId", "username");
        return new Response(JSON.stringify(content),{
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

export async function DELETE(req : NextRequest){
    try{
        const headers : (string | null)= req.headers.get("authorization");
        const body : {id : string} = await req.json();
        if(headers == null){
            return new Response(JSON.stringify({message : "Authorization header not present"}),{
                status : 403,
                headers : { "Content-Type": "application/json" }
            });
        }
        const decoded = jwt.verify(headers, process.env.JWT_SECRET || "");
        const userId = (decoded as {userId : string}).userId;
        dbConnect();
        await Content.deleteOne({
            _id : body.id,
            userId : userId
        });
        return new Response(JSON.stringify({message : "Content deleted"}),{
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