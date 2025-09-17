import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import FeaturesSection from '@/components/FeaturesSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
