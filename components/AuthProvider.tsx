"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export interface resProps{
    check : boolean,
    userId? : string
}


export default function AuthProvider({ children } : {children : React.ReactNode}){
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(!token){
            router.push('/signin');
        }else{
            fetch(`/api/v1/validate?token=${token}`).then((res) => res.json()).then((res) =>{
                if(res.check){
                    setLoading(false);
                }else{
                    router.push('/signin');
                }
            })
        }
    },[router])
    if(loading){
        return <div>Loading...</div>
    }
    return <>{children}</>
}