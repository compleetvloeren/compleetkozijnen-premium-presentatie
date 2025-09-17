import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Producten from "./pages/Producten";
import GealanProducten from "./pages/GealanProducten";
import SchuecoProdukten from "./pages/SchuecoProdukten";
import Offerte from "./pages/Offerte";
import NotFound from "./pages/NotFound";
import GealanS9000Base from "./pages/products/GealanS9000Base";
import GealanS9000Haax from "./pages/products/GealanS9000Haax";
import GealanS9000Styl from "./pages/products/GealanS9000Styl";
import GealanS9000Slim from "./pages/products/GealanS9000Slim";
import OverOns from "./pages/OverOns";
import Service from "./pages/Service";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/producten" element={<Producten />} />
          <Route path="/producten/gealan" element={<GealanProducten />} />
          <Route path="/producten/schueco" element={<SchuecoProdukten />} />
          <Route path="/producten/s9000-base" element={<GealanS9000Base />} />
          <Route path="/producten/s9000-haax" element={<GealanS9000Haax />} />
          <Route path="/producten/s9000-styl" element={<GealanS9000Styl />} />
          <Route path="/producten/s9000-slim" element={<GealanS9000Slim />} />
          <Route path="/over-ons" element={<OverOns />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/offerte" element={<Offerte />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
