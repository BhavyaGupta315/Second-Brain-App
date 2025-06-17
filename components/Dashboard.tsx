"use client"
import Card from "@/components/Card";
import { CardProps } from "./MainPage";
import { Dispatch, SetStateAction } from "react";

interface DashboardProps {
    cardData : CardProps[],
    setCardData : Dispatch<SetStateAction<CardProps[]>>,
    param : string
}

export default function Dashboard({cardData, setCardData, param} : DashboardProps){
    const filteredCards = param
    ? cardData.filter((card) => card.type === param)
    : cardData;
    if(filteredCards.length === 0){
        return <div className="flex justify-center items-center h-full">
            <div className="opacity-[40%]">
                Add Content to show here ↗
            </div>
        </div>
    }
    
    return <div>
        <div className="grid lg:grid-cols-3 lg:gap-2 md:grid-cols-2 md:gap-1 sm:grid-cols-1">
                {filteredCards.map((card, index) => (
                    <Card
                    key={index}
                    id={card._id}
                    type={card.type}
                    link={card.link}
                    title={card.title}
                    tags={card.tags}
                    userId={card.userId}
                    setCardData={setCardData}
                    />
                ))}
        </div>
    </div>
}