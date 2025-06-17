import axios from "axios";
import {Instagram, Link2, Linkedin, Share2, Trash2, Twitter, Youtube } from "lucide-react"
import { Dispatch, SetStateAction } from "react";
import { CardProps } from "./MainPage";

interface Tag {
  _id: string;
  title: string;
}


interface CardsProps{
    id : string,
    type : 'twitter' | 'youtube' | 'linkedin' | 'instagram' | 'link',
    title : string,
    link : string,
    tags?: Tag[];
    userId? : string,
    setCardData: Dispatch<SetStateAction<CardProps[]>>;
}
const iconMap = {
    twitter: Twitter,
    youtube: Youtube,
    instagram: Instagram,
    linkedin: Linkedin,
    link: Link2,
  } as const;   
  

export default function Card({id, type, title, link, tags = [], userId='1', setCardData} : CardsProps){
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
                <div className="flex m-2 gap-4 mr-1">
                    <Share2 onClick={() => alert("You can't share individual content as of this version")}/>
                    <Trash2 onClick={handleDelete}/>
                </div>
            </div>
            <div>{link}</div>
            <div>{type}</div>
            <div>{tags?.map(tag => tag.title).join(", ")}</div>
        </div>
    </div>
}