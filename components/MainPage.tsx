"use client"
import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";

interface Tag {
  _id: string;
  title: string;
}


export interface CardProps{
    "_id" : string,
    "link" : string,
    "type" : 'youtube'| 'instagram'| 'twitter'| 'linkedin' | 'link',
    "title" : string,
    "tags" : Tag[],
    "userId" : string
}

export default function MainPage(){
    const [cardData, setCardData] = useState<CardProps[]>([]);
    const [param, setParam] = useState("");
    const fetchData = async () => {
        const token = localStorage.getItem('token');
        const res = await fetch("/api/v1/content", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        const data = await res.json();
        setCardData(data);
    };

    useEffect(() => {
        fetchData();
        const updateHash = () => {
            const hash = window.location.hash.replace("#", "");
            setParam(hash);
        };

        window.addEventListener("hashchange", updateHash);

        // Initialize once on load
        updateHash();

        return () => window.removeEventListener("hashchange", updateHash);
    }, []);

    return <main className="w-screen h-screen">
        <Navbar onContentAdded={fetchData}/>
        <Dashboard cardData={cardData} setCardData={setCardData} param={param}/>
    </main>
}