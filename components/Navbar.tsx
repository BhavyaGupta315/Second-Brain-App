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
import ShareBrain from "./ShareBrain";

export default function Navbar({onContentAdded, isShared} : {onContentAdded : () => void, isShared : boolean}) {

  return (
      <div className="h-16 flex items-center justify-between sm:px-8 shadow-sm">
        <div className="flex items-center">
            <SidebarTrigger className="sm:ml-2 cursor-pointer size-10"/>  
            <div className="sm:ml-6 text-lg font-sans"> Notes </div>
        </div>
        {!isShared && 
        <div className="flex sm:gap-8 gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button><Share2/>Share Brain</Button> 
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Share Your Brain</DialogTitle>
                <DialogDescription>
                    Enable this Link to share your brain
                </DialogDescription>
              </DialogHeader>
                <ShareBrain/>
            </DialogContent>
          </Dialog>



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
                <AddContent onContentAdded={onContentAdded}/>
            </DialogContent>
          </Dialog>
        </div>
        }
      </div>     
  );
}
