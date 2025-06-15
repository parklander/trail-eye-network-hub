import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Index from "./pages/Index";
import Cameras from "./pages/Cameras";
import Deployments from "./pages/Deployments";
import Media from "./pages/Media";
import Analysis from "./pages/Analysis";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";
import Observations from "./pages/Observations";
import React from "react";
import Models from "./pages/Models";
import Training from "./pages/Training";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SidebarProvider>
        <BrowserRouter>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <main className="flex-1 min-h-screen">
              <SidebarTrigger />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/cameras" element={<Cameras />} />
                <Route path="/deployments" element={<Deployments />} />
                <Route path="/media" element={<Media />} />
                <Route path="/analysis" element={<Analysis />} />
                <Route path="/observations" element={<Observations />} />
                <Route path="/models" element={<Models />} />
                <Route path="/training" element={<Training />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </SidebarProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
