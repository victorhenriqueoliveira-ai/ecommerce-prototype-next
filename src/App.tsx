
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Products Routes */}
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<div>Product Detail - Coming Soon</div>} />
            <Route path="/categories" element={<div>Categories Page - Coming Soon</div>} />
            <Route path="/deals" element={<div>Deals Page - Coming Soon</div>} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<div>Login Page - Coming Soon</div>} />
            <Route path="/register" element={<div>Register Page - Coming Soon</div>} />
            
            {/* Customer Routes */}
            <Route path="/account" element={<div>Customer Dashboard - Coming Soon</div>} />
            <Route path="/orders" element={<div>Orders Page - Coming Soon</div>} />
            <Route path="/track" element={<div>Track Order - Coming Soon</div>} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<div>Admin Dashboard - Coming Soon</div>} />
            
            {/* Shopping Routes */}
            <Route path="/cart" element={<div>Cart Page - Coming Soon</div>} />
            <Route path="/checkout" element={<div>Checkout Page - Coming Soon</div>} />
            
            {/* Info Pages */}
            <Route path="/help" element={<div>Help Center - Coming Soon</div>} />
            <Route path="/contact" element={<div>Contact - Coming Soon</div>} />
            <Route path="/about" element={<div>About Us - Coming Soon</div>} />
            <Route path="/terms" element={<div>Terms - Coming Soon</div>} />
            <Route path="/privacy" element={<div>Privacy - Coming Soon</div>} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
