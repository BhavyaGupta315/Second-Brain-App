"use client"
import Card from "@/components/Card";
import { CardProps } from "./MainPage";
import { Dispatch, SetStateAction } from "react";

interface DashboardProps {
    cardData : CardProps[],
    setCardData : Dispatch<SetStateAction<CardProps[]>>,
    param : string
    isShared : boolean
}

export default function Dashboard({cardData, setCardData, param, isShared} : DashboardProps){
    const filteredCards = param
    ? cardData.filter((card) => card.type === param)
    : cardData;
    if(filteredCards.length === 0){
        return <div className="flex justify-center items-center h-full">
            <div className="opacity-[40%]">
                {isShared === true ? (<p>
                    Not a Valid Brain Link
                </p>) : (<p>
                    Add Content to show here ↗
                </p>)}
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
                    isShared={isShared}
                    />
                ))}
        </div>
    </div>
}