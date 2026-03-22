import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import GeneratePage from "./pages/GeneratePage.tsx";
import GerarFutebolPage from "./pages/GerarFutebolPage.tsx";
import GuiaFutebolPage from "./pages/GuiaFutebolPage.tsx";
import GerarVideoPage from "./pages/GerarVideoPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/gerar-futebol" element={<GerarFutebolPage />} />
          <Route path="/guia-futebol" element={<GuiaFutebolPage />} />
          <Route path="/:category/:type" element={<GeneratePage />} />
          <Route path="/:category" element={<GeneratePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
