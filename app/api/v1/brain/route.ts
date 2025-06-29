import dbConnect from "@/lib/dbconnect";
import { NextRequest } from "next/server";
import Link from "@/models/Link";
import Content from "@/models/Content";
import User from "@/models/Users"; 
import Tags from "@/models/Tags";

export async function GET(req : NextRequest){
    try{
        const searchParams = req.nextUrl.searchParams;
        if(!searchParams.has("link")){
            return new Response(JSON.stringify({message : "Link not found"}),{
                status : 404,
                headers : { "Content-Type": "application/json" }
            });
        }
        const link = searchParams.get("link");
        dbConnect();
        if(link == null){
            return new Response(JSON.stringify({message : "Link not found"}),{
                status : 404,
                headers : { "Content-Type": "application/json" }
            });
        }
        await User.exists({});
        await Tags.exists({});
        const linkDoc = await Link.findOne({ hash : link }).populate("userId", "username");
          if (!linkDoc || !linkDoc.userId) {
            return new Response(JSON.stringify({ message: "Link or User not found" }), {
              status: 404,
              headers: { "Content-Type": "application/json" },
            });
          }
          const { _id: userId, username } = linkDoc.userId;
      
          const contentArray = await Content.find({ userId }).populate("tags", "title");;
      
          return new Response(JSON.stringify({ username, content: contentArray }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
    }catch(err){
        console.log(err);
        return new Response(JSON.stringify({message : err}),{
            status : 500,
            headers : { "Content-Type": "application/json" }
        });
    }
}