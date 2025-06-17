import { NextRequest } from "next/server";
import Content from "@/models/Content";
import dbConnect from "@/lib/dbconnect";
import Tag from "@/models/Tags";
import * as jwt from "jsonwebtoken";
import Tags from "@/models/Tags";

interface ContentSchema{
    "link" : string,
    "type" : 'youtube'| 'instagram'| 'twitter'| 'linkedin' | 'link',
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
        const headers : (string | null)= req.headers.get("Authorization");
        if(!headers || !headers.startsWith("Bearer ")){
            return new Response(JSON.stringify({message : "Authorization header not present"}),{
                status : 403,
                headers : { "Content-Type": "application/json" }
            });
        }
        const token = headers.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
        const userId = (decoded as {userId : string}).userId;
        const content = await Content.create({
            ...body,
            userId : userId
        }); 

        return new Response(JSON.stringify(content), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    }catch(err){
        console.log(err);
        return new Response(JSON.stringify({message : err}),{
            status : 500,
            headers : { "Content-Type": "application/json" }
        });
    }
}

export async function GET(req : NextRequest){
    const headers : (string | null)= req.headers.get("Authorization");
    if(!headers || !headers.startsWith("Bearer ")){
            return new Response(JSON.stringify({message : "Authorization header not present"}),{
                status : 403,
                headers : { "Content-Type": "application/json" }
            });
        }
    const token = headers.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
    const userId = (decoded as {userId : string}).userId;
    dbConnect();
    try{
        await Tags.exists({});
        const content = await Content.find({
            userId : userId
        })
        .populate("tags", "title");

        return new Response(JSON.stringify(content),{
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

export async function DELETE(req : NextRequest){
    try{
        const body : {id : string, userId : string} = await req.json();
        dbConnect();
        await Content.deleteOne({
            _id : body.id,
            userId :body.userId
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