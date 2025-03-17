import Navbar from "@/components/Navbar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import Card from "@/components/Card";

export default function Home() {
  return (
    <SidebarProvider>
        <AppSidebar/>
          <main className="w-screen h-screen">
              <Navbar/>
              <div className="grid lg:grid-cols-3 lg:gap-2 md:grid-cols-2 md:gap-1 sm:grid-cols-1">
                <Card type="linkedin" link="Here" title="Hello" tags={["Hello", "World"]}/>
                <Card type="twitter" link="Here" title="Hello" tags={["Hello", "World"]}/>
                <Card type="youtube" link="Here" title="Hello" tags={["Hello", "World"]}/>
                <Card type="instagram" link="Here" title="This is so important, come here" tags={["Hello", "World"]}/> 
                <Card type="link" link="Here" title="Come here fast" tags={["Hello", "World"]}/>
              </div>
              
          </main>
      </SidebarProvider>
  );
}
