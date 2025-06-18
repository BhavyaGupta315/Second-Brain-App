"use client"
import axios from "axios";
import {Instagram, Link2, Linkedin, Share2, Trash2, Twitter, Youtube,  Loader2, Link2Icon  } from "lucide-react"
import { useEffect, useRef, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { CardProps } from "./MainPage";

interface Tag {
  _id: string;
  title: string;
}

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement | null) => void;
      };
    };
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
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

    return <div className="border rounded-md shadow-md p-4 m-4 hover:shadow-lg hover:scale-102 transition duration-300 cursor-pointer">
        <div>
            <div className="flex justify-between">
                <div className="flex m-2 gap-4">
                    <IconComponent size={32}/>
                    <div className="ml-2.5 text-lg font-semibold font-sans">{title}</div>
                </div>
                {!isShared && 
                <div className="flex m-2 gap-4 mr-1">
                    <Share2 onClick={() => alert("You can't share individual content as of this version")}/>
                    <Trash2 onClick={handleDelete}/>
                </div>
                }
            </div>
            <div>
              <EmbeddedContent type={type} link={link}/>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
            {tags.length > 0 && tags?.map(tag => (
              <Tag key={tag._id}>{tag.title}</Tag>
            ))}
          </div>

        </div>
    </div>
}

interface Props {
  link: string;
  type: "youtube" | "linkedin" | "instagram" | "twitter" | "link";
}

const EmbeddedContent = ({ link, type }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    if (type === "twitter" && window.twttr){
      window.twttr.widgets.load(ref.current);
      setLoading(false);
    } else if (type === "instagram" && window.instgrm) {
      window.instgrm.Embeds.process();
      setLoading(false);
    } else if (type === "linkedin") {
      const script = document.createElement("script");
      script.src = "https://platform.linkedin.com/in.js";
      script.type = "text/javascript";
      script.innerHTML = "lang: en_US";
      document.body.appendChild(script);
      setTimeout(() => setLoading(false), 1000); // rough delay for render
    }
  }, [type, link]);

  const handleIframeLoad = () => setLoading(false);
  const handleIframeError = () => {
    setLoading(false);
    setError(true);
  };

  const renderFallback = () => (
    <div className="w-full max-w-xl mx-auto border rounded-2xl shadow-md p-4 flex items-center gap-4 bg-white">
      <div className="p-3 bg-blue-100 rounded-full">
        {
          {
            youtube: <Youtube className="text-red-500" />,
            instagram: <Instagram className="text-pink-500" />,
            twitter: <Twitter className="text-blue-400" />,
            linkedin: <Linkedin className="text-blue-700" />,
            link: <Link2Icon />,
          }[type]
        }
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-600 mb-1">Unable embed the content.</p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 font-medium hover:underline break-all"
        >
          {link}
        </a>
      </div>
    </div>
  );

  const videoId = type === "youtube"
    ? new URL(link).searchParams.get("v") || link.split("/").pop()
    : "";

  return (
    <div className="my-4 w-full max-w-2xl mx-auto">
      {loading && (
        <div className="flex items-center justify-center h-48 bg-gray-100 rounded-xl">
          <Loader2 className="animate-spin text-gray-500" size={32} />
        </div>
      )}

      {!error && (
        <>
          {type === "youtube" && (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube Video"
              className={`w-full aspect-video rounded-xl border ${loading ? "hidden" : ""}`}
              allowFullScreen
              onLoad={handleIframeLoad}
              onError={handleIframeError}
            />
          )}

          {type === "twitter" && (
            <div ref={ref} className={loading ? "hidden" : ""}>
              <blockquote className="twitter-tweet">
                <a href={link}></a>
              </blockquote>
              <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
            </div>
          )}

          {type === "instagram" && (
            <div ref={ref} className={loading ? "hidden" : ""}>
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={link}
                data-instgrm-version="14"
              ></blockquote>
              <script async src="//www.instagram.com/embed.js"></script>
            </div>
          )}

          {type === "linkedin" && (
            <div className={loading ? "hidden" : ""}>
              <script type="IN/Share" data-url={link}></script>
            </div>
          )}

          {type === "link" && (
            <iframe
              src={link}
              className={`w-full h-64 rounded-xl border ${loading ? "hidden" : ""}`}
              onLoad={handleIframeLoad}
              onError={handleIframeError}
            ></iframe>
          )}
        </>
      )}
      <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute top-2 left-2 bg-white p-2 rounded-full shadow hover:shadow-md transition-all"
      title="Open original link"
    >
      <Link2Icon className="w-5 h-5 text-blue-600" />
    </a>
      {!loading && error && renderFallback()}
    </div>
  );
};

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="px-3 py-1 rounded-full bg-black text-white text-xs font-medium">
    {children}
  </span>
);

