import { Instagram, Twitter, Youtube, Link2, Linkedin, Box } from "lucide-react"

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
    title: "All",
    url: "#",
    icon: Box,
  },
  {
    title: "Twitter",
    url: "#twitter",
    icon: Twitter,
  },
  {
    title: "Youtube",
    url: "#youtube",
    icon: Youtube,
  },
  {
    title: "Instagram",
    url: "#instagram",
    icon: Instagram,
  },
  {
    title: "Linkedin",
    url: "#linkedin",
    icon: Linkedin,
  },
  {
    title: "Link",
    url: "#link",
    icon: Link2,
  }
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
