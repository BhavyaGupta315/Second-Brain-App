"use client"
import Card from "@/components/Card";
import { useEffect, useState } from "react";

interface CardProps{
    "link" : string,
    "type" : 'youtube'| 'instagram'| 'twitter'| 'linkedin' | 'link',
    "title" : string,
    "tags" : string[],
}

export default function Dashboard(){
    const [cardData, setCardData] = useState<CardProps[]>([]);
    useEffect(() => {
    const token = localStorage.getItem('token');

    (async () => {
        const res = await fetch("/api/v1/content", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

        const data = await res.json();
        console.log(data);
        setCardData([...cardData, ...data]);
    })();
    }, []);

    console.log("Card Data:", cardData);
    return <div>
        <div className="grid lg:grid-cols-3 lg:gap-2 md:grid-cols-2 md:gap-1 sm:grid-cols-1">
                <Card type="linkedin" link="Here" title="Hello" tags={["Hello", "World"]}/>
                <Card type="twitter" link="Here" title="Hello" tags={["Hello", "World"]}/>
                <Card type="youtube" link="Here" title="Hello" tags={["Hello", "World"]}/>
                <Card type="instagram" link="Here" title="This is so important, come here" tags={["Hello", "World"]}/> 
                <Card type="link" link="Here" title="Come here fast" tags={["Hello", "World"]}/>
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