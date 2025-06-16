import { Plus, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import {SidebarTrigger } from "@/components/ui/sidebar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AddContent from "./AddContent";

export default function Navbar() {

  return (
      <div className="h-16 flex items-center justify-between sm:px-8 shadow-sm">
        <div className="flex items-center">
            <SidebarTrigger className="sm:ml-2 cursor-pointer size-10"/>  
            <div className="sm:ml-6 text-lg font-sans"> Notes </div>
        </div>
        <div className="flex sm:gap-8 gap-2">
          <Button><Share2/>Share Brain</Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button><Plus/>Add Content</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Content</DialogTitle>
                <DialogDescription>
                    Fill all the fields to add new content
                </DialogDescription>
              </DialogHeader>
                <AddContent/>
            </DialogContent>
          </Dialog>
        </div>
      </div>     
  );
}
