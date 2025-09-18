import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import ResponsiveBreadcrumb from '@/components/ResponsiveBreadcrumb';
import Hero from '@/components/Hero';
import BrandShowcase from '@/components/BrandShowcase';
import FeaturesSection from '@/components/FeaturesSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const location = useLocation();
  const { toast } = useToast();
  
  // Show message if redirected from protected route
  useEffect(() => {
    if (location.state?.message) {
      toast({
        title: "Toegang geweigerd",
        description: location.state.message,
        variant: "destructive"
      });
      
      // Clear the state to prevent showing message on subsequent visits
      window.history.replaceState({}, document.title);
    }
  }, [location.state, toast]);
  return (
    <div className="min-h-screen">
      <Navigation />
      <ResponsiveBreadcrumb />
      <main>
        <Hero />
        <BrandShowcase />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
