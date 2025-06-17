"use client"
import { useCallback, useEffect, useState } from "react";
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

export default function MainPage({isShared = false, params} : {isShared? : boolean, params? : string}){
    const [cardData, setCardData] = useState<CardProps[]>([]);
    const [username, setUsername] = useState("");
    const [param, setParam] = useState("");
    const fetchData = useCallback( async () => {
        if(isShared){
            
            const res = await fetch(`/api/v1/brain?link=${params}`);
            if(!res.ok){
                const errData = await res.json();
                console.log(errData);
                return;
            }
            const data = await res.json();
            setUsername(data.username);
            setCardData(data.content);
            return;
        }
        const token = localStorage.getItem('token');
        const res = await fetch("/api/v1/content", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        const data = await res.json();
        setCardData(data);
    },[isShared, params]);

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
    }, [fetchData]);

    return <main className="w-screen h-screen">
        <Navbar onContentAdded={fetchData} isShared={isShared}/> 
        {isShared && <div className="p-2 shadow-xs font-bold text-2xl items-center flex justify-center">{username}</div>}
        <Dashboard cardData={cardData} setCardData={setCardData} param={param} isShared={isShared}/>
    </main>
}