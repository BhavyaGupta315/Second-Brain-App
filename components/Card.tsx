import axios from "axios";
import {Instagram, Link2, Linkedin, Share2, Trash2, Twitter, Youtube } from "lucide-react"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CardProps } from "./MainPage";

interface Tag {
  _id: string;
  title: string;
}

declare global {
  interface Window {
    twttr?: any;
  }
}


interface CardsProps{
    id : string,
    type : 'twitter' | 'youtube' | 'linkedin' | 'instagram' | 'link',
    title : string,
    link : string,
    tags?: Tag[];
    userId? : string,
    setCardData: Dispatch<SetStateAction<CardProps[]>>;
    isShared:boolean;
}
const iconMap = {
    twitter: Twitter,
    youtube: Youtube,
    instagram: Instagram,
    linkedin: Linkedin,
    link: Link2,
  } as const;   
  

export default function Card({id, type, title, link, tags = [], userId='1', setCardData, isShared=false} : CardsProps){
    const IconComponent = iconMap[type]; 
    if (!IconComponent) {
        console.error(`Unknown icon type: ${type}`);
        return null; 
    }
    useEffect(() => {
        const script = document.createElement("script");
        script.setAttribute("src", "https://platform.twitter.com/widgets.js");
        script.setAttribute("async", "true");
        document.body.appendChild(script);
    }, []);


    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this content?");
        if (!confirmDelete) return;
        try{
            await axios.delete("/api/v1/content", {
                data : {
                    "id" : id,
                    "userId" : userId
                }
            })
            setCardData((prev) => prev.filter((card) => card._id !== id));
        }catch(e){
            console.log(e);
        }
    }

    return <div className="border rounded-md shadow-md p-4 m-4 hover:shadow-lg hover:scale-[1.02] transition duration-300 cursor-pointer">
  <div>
    <div className="flex justify-between">
      <div className="flex m-2 gap-4">
        <IconComponent size={32} />
        <div className="ml-2.5 text-lg font-semibold font-sans">{title}</div>
      </div>
      {!isShared && (
        <div className="flex m-2 gap-4 mr-1">
          <Share2 onClick={() => alert("You can't share individual content as of this version")} />
          <Trash2 onClick={handleDelete} />
        </div>
      )}
    </div>
      {type === "link" ? (<p>{type}</p>) : (
            <div className="w-full max-w-full h-[300px] relative my-4 overflow-hidden flex items-center justify-center">
                <div className="scale-90 origin-top transform">
                <EmbeddedContent link={link} />
                </div>
            </div>
      )}

    <div>{tags?.map(tag => tag.title).join(", ")}</div>
  </div>
</div>

}

type Props = {
  link: string;
};
const EmbeddedContent = ({ link }: Props) => {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    if (!link) return;

    const fetchEmbed = async () => {
      try {
        const API = process.env.NEXT_PUBLIC_FRAME_API;
        if (!API) {
          alert("Missing API Key");
          return;
        }

        const res = await axios.get(
          `https://iframe.ly/api/iframely?url=${encodeURIComponent(link)}&key=${API}`
        );
        setHtml(res.data.html);
      } catch (err) {
        console.error("Failed to fetch embed", err);
      }
    };

    fetchEmbed();
  }, [link]);

  useEffect(() => {
    if (!html) return;

    const existing = document.querySelector("script[src='https://cdn.iframe.ly/embed.js']");

    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://cdn.iframe.ly/embed.js";
      script.async = true;
      script.onload = () => {
        (window as any).iframely?.load?.();
      };
      document.body.appendChild(script);
    } else {
      (window as any).iframely?.load?.();
    }
  }, [html]);

  if (!html) return <p>Loading preview...</p>;

  return (
    <div
      className="w-full max-w-full overflow-hidden"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
