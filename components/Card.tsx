import {Instagram, Link2, Linkedin, Share2, Trash2, Twitter, Youtube } from "lucide-react"

interface CardProps{
    type : 'twitter' | 'youtube' | 'linkedin' | 'instagram' | 'link',
    title : string,
    link : string,
    tags : string[],
}
const iconMap = {
    twitter: Twitter,
    youtube: Youtube,
    instagram: Instagram,
    linkedin: Linkedin,
    link: Link2,
  } as const;   
  

export default function Card({type, title, link, tags} : CardProps){
    const IconComponent = iconMap[type]; 
    return <div className="border rounded-md shadow-md p-4 m-4 hover:shadow-lg hover:scale-102 transition duration-300 cursor-pointer">
        <div>
            <div className="flex justify-between">
                <div className="flex m-2 gap-4">
                    <IconComponent size={32}/>
                    <div className="ml-2.5 text-lg font-semibold font-sans">{title}</div>
                </div>
                <div className="flex m-2 gap-4 mr-1">
                    <Share2/>
                    <Trash2/>
                </div>
            </div>
            <div>{link}</div>
            <div>{type}</div>
            <div>{tags.join(",")}</div>
        </div>
    </div>
}