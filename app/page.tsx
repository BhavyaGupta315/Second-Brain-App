import Navbar from "@/components/Navbar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Home() {
  return (
    <SidebarProvider>
        <AppSidebar/>
          <main className="w-screen h-screen">
              <Navbar/>
            
          </main>
      </SidebarProvider>
  );
}
