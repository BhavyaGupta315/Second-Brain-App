"use client"
import Card from "@/components/Card";
import { useEffect, useState } from "react";

interface Tag {
  _id: string;
  title: string;
}


interface CardProps{
    "link" : string,
    "type" : 'youtube'| 'instagram'| 'twitter'| 'linkedin' | 'link',
    "title" : string,
    "tags" : Tag[],
}

export default function Dashboard(){
    const [cardData, setCardData] = useState<CardProps[]>([]);
    useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchData = async () => {
        const res = await fetch("/api/v1/content", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

        const data = await res.json();
        
        setCardData([...cardData, ...data]);
    };
    fetchData();
    },[]);

    return <div>
        <div className="grid lg:grid-cols-3 lg:gap-2 md:grid-cols-2 md:gap-1 sm:grid-cols-1">
                <Card type="linkedin" link="Here" title="Hello"/>
                <Card type="twitter" link="Here" title="Hello"/>
                <Card type="youtube" link="Here" title="Hello"/>
                <Card type="instagram" link="Here" title="This is so important, come here"/> 
                <Card type="link" link="Here" title="Come here fast"/>
                {cardData.map((card, index) => (
                    <Card
                    key={index}
                    type={card.type}
                    link={card.link}
                    title={card.title}
                    tags={card.tags}
                    />
                ))}
        </div>
    </div>
}