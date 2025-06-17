import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

import AuthProvider from "@/components/AuthProvider";
import MainPage from "@/components/MainPage";

export default function Home() {
  return (
    <AuthProvider>
    <SidebarProvider>
        <AppSidebar/>
        <MainPage/>
      </SidebarProvider>
      </AuthProvider>
  );
}
