"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { Switch } from "./ui/switch";

export default function ShareBrain(){
    const [link, setLink] = useState("");
    const [shared, setShared] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchInitialLink = async () => {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/v1/brain/share",{
            headers : {
                "Authorization" : `Bearer ${token}`
            }
        })
        if(response.data.shared){
            setLink(response.data.link);
            setShared(true);
        }
    }
    useEffect(() => {
        setLoading(true);
        fetchInitialLink();   
        setLoading(false);
    },[]);

    const handleToggle = async (value: boolean) => {
        try{setShared(value);
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.post("/api/v1/brain/share",{
                share : value
            },{
            headers : {
                "Authorization" : `Bearer ${token}`
            }
        })
        
        if (value) {
            setLink(response.data.link);
        } else {
            setLink("");
        }
        setLoading(false);
    }catch(e){
        console.log(e);
    }
    };

    return <div className="flex flex-col items-center justify-center border rounded-2xl shadow-md p-6 bg-white gap-4 w-full max-w-md mx-auto">
            <div className="flex flex-col items-center gap-2">
                <label className="text-lg font-semibold text-gray-800">Share Link</label>
                
                <div className={`relative ${loading ? "opacity-60 cursor-not-allowed" : ""}`}>
                <Switch 
                    checked={shared}
                    onCheckedChange={handleToggle}
                    disabled={loading}
                    className="scale-150 data-[state=checked]:bg-green-500 hover:cursor-pointer"
                />
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-blue-500" />
                    </div>
                )}
                </div>
            </div>

            <div className="w-full text-center">
                <span className="text-gray-600 font-medium">Link: </span>
                {link ? (
                <a
                    href={`/brain/${link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline break-words"
                >
                    {link}
                </a>
                ) : (
                <span className="text-gray-400 italic">No link generated</span>
                )}
            </div>
        </div>


}