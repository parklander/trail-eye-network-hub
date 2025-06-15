import { Home, Camera, ListChecks, Image, ActivitySquare, FolderKanban, Layers, BrainCircuit } from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem
} from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";
import React from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import ThemeToggle from "./ThemeToggle";

// Default sidebar items
const defaultItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Projects", url: "/projects", icon: FolderKanban },
  { title: "Cameras", url: "/cameras", icon: Camera },
  { title: "Deployments", url: "/deployments", icon: ListChecks },
  { title: "Media", url: "/media", icon: Image },
  { title: "Observations", url: "/observations", icon: ListChecks },
  { title: "Models", url: "/models", icon: Layers },
  { title: "Training", url: "/training", icon: BrainCircuit },
  { title: "Analysis", url: "/analysis", icon: ActivitySquare }, // Analysis at bottom
];

function isActive(url: string, pathname: string) {
  if (url === "/projects" && pathname.startsWith("/projects")) return true;
  return url === pathname;
}

function getActiveProject(pathname: string) {
  if (pathname.startsWith("/projects/") && pathname !== "/projects") {
    return "Active Project: Wolf Camera Survey";
  }
  return null;
}

export function AppSidebar() {
  const location = useLocation();
  const pathname = location.pathname;

  // Use local state to store sidebar item order
  const [items, setItems] = React.useState(defaultItems);

  // Drag End Handler
  function handleDragEnd(result: DropResult) {
    if (!result.destination) return;
    const updated = Array.from(items);
    const [removed] = updated.splice(result.source.index, 1);
    updated.splice(result.destination.index, 0, removed);
    setItems(updated);
  }

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
            {/* DragDropContext enables dragging for the entire menu */}
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="sidebar-menu">
                {(provided) => (
                  <SidebarMenu ref={provided.innerRef} {...provided.droppableProps}>
                    {items.map((item, idx) => (
                      <Draggable key={item.title} draggableId={item.title} index={idx}>
                        {(dragProvided, dragSnapshot) => (
                          <SidebarMenuItem
                            ref={dragProvided.innerRef}
                            {...dragProvided.draggableProps}
                            {...dragProvided.dragHandleProps}
                            className={dragSnapshot.isDragging ? "bg-sidebar-accent/60" : ""}
                          >
                            <SidebarMenuButton asChild isActive={isActive(item.url, pathname)}>
                              <a href={item.url} className="flex items-center gap-2">
                                <item.icon />
                                <span>{item.title}</span>
                              </a>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </SidebarMenu>
                )}
              </Droppable>
            </DragDropContext>
            <div className="flex-grow" />
            <ThemeToggle />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
