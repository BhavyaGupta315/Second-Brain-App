import Navbar from "@/components/Navbar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

import AuthProvider from "@/components/AuthProvider";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  return (
    <AuthProvider>
    <SidebarProvider>
        <AppSidebar/>
          <main className="w-screen h-screen">
              <Navbar/>
              <Dashboard/>
              
          </main>
      </SidebarProvider>
      </AuthProvider>
  );
}
