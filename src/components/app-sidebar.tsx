
import { Home, Camera, ListChecks, Image, ActivitySquare, FolderKanban } from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem
} from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";
import React from "react";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Projects", url: "/projects", icon: FolderKanban },
  { title: "Cameras", url: "/cameras", icon: Camera },
  { title: "Deployments", url: "/deployments", icon: ListChecks },
  { title: "Media", url: "/media", icon: Image },
  { title: "Analysis", url: "/analysis", icon: ActivitySquare }
];

// Function to determine if the menu item is active
function isActive(url: string, pathname: string) {
  // Active for "Projects" is /projects or any subpage
  if (url === "/projects" && pathname.startsWith("/projects")) {
    return true;
  }
  return url === pathname;
}

// Simulate a selected/active project for demonstration
function getActiveProject(pathname: string) {
  // If on a project details page, e.g. /projects/123
  if (pathname.startsWith("/projects/") && pathname !== "/projects") {
    // Here we would fetch the name from state or route param
    // For now, show a hard-coded example
    return "Active Project: Wolf Camera Survey";
  }
  return null;
}

export function AppSidebar() {
  const location = useLocation();
  const pathname = location.pathname;
  const activeProject = getActiveProject(pathname);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Trail Eye Network</SidebarGroupLabel>
          <SidebarGroupContent>
            {activeProject && (
              <div className="bg-sidebar-accent text-sidebar-accent-foreground rounded px-3 py-1 mb-2 text-xs font-semibold">
                {activeProject}
              </div>
            )}
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url, pathname)}>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
