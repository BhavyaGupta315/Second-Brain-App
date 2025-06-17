"use client"
import { AppSidebar } from "@/components/app-sidebar";
import MainPage from "@/components/MainPage";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useParams } from "next/navigation";

export default function BrainClientPage(){
    const params = useParams();
    const brainId = params?.brainId;   
    const safeBrainId = Array.isArray(brainId) ? brainId[0] : brainId ?? "";
    return <div>
        <SidebarProvider>
        <AppSidebar/>
        <MainPage isShared={true} params={safeBrainId}/>
      </SidebarProvider>
    </div>
}