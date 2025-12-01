import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Navigation from "@/components/Navigation";
import { Ticker } from "@/components/Ticker";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));
const JoinUs = lazy(() => import("./pages/JoinUs"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background text-foreground">
            <Navigation />
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/join" element={<JoinUs />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Ticker />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;