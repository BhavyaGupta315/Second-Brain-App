import { Instagram, Twitter, Youtube, Link2, Hash, Linkedin } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Twitter",
    url: "#",
    icon: Twitter,
  },
  {
    title: "Youtube",
    url: "#",
    icon: Youtube,
  },
  {
    title: "Instagram",
    url: "#",
    icon: Instagram,
  },
  {
    title: "Linkedin",
    url: "#",
    icon: Linkedin,
  },
  {
    title: "Link",
    url: "#",
    icon: Link2,
  },
  {
    title: "Tags",
    url: "#",
    icon: Hash,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mt-6 text-3xl font-sans text-black font-semibold">Second Brain</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon/>
                      <span className="text-lg font-sans">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
