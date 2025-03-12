import { NextRequest } from "next/server";
import Content from "@/models/Content";
import dbConnect from "@/lib/dbconnect";
import Tag from "@/models/Tags";

interface ContentSchema{
    "link" : string,
    "type" : 'image'| 'article'| 'video' | 'audio',
    "title" : string,
    "tags" : string[],
    "userId" : string
}

export async function POST(req : NextRequest){
    try{
        const body : ContentSchema = await req.json();
        dbConnect();

        const tagsAdded = body.tags || [];  
        const tagIds = [];

        for (let i = 0; i < tagsAdded.length; i++) {
            const tagName = tagsAdded[i];
            let tag = await Tag.findOneAndUpdate(
                { title: tagName },
                { $setOnInsert: { title: tagName } },
                { upsert: true, new: true }
            );

            tagIds.push(tag._id);
        }

        // Ensure body.tags is now an array of ObjectIds
        body.tags  = tagIds;
        console.log(body);
        const content = await Content.create(body); 
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