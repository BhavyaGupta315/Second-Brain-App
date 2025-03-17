import { Plus, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import {SidebarTrigger } from "@/components/ui/sidebar"

export default function Navbar() {

  return (
      <div className="h-16 flex items-center justify-between sm:px-8 shadow-sm">
        <div className="flex items-center">
            <SidebarTrigger className="sm:ml-2 cursor-pointer size-10"/>  
            <div className="sm:ml-6 text-lg font-sans"> Notes </div>
        </div>
        <div className="flex sm:gap-8 gap-2">
          <Button><Share2/>Share Brain</Button>
          <Button><Plus/>Add Content</Button>
        </div>
      </div>     
  );
}
