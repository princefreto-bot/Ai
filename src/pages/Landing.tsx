import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/landing/Hero';
import { LogoScroller } from '@/components/landing/LogoScroller';
import { Benefits } from '@/components/landing/Benefits';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Features } from '@/components/landing/Features';
import { CTA } from '@/components/landing/CTA';

export function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* 1. Hero - Accroche principale */}
        <Hero />
        
        {/* 2. Logos - Preuve sociale */}
        <LogoScroller />
        
        {/* 3. AVANTAGES - Section clé AVANT de demander de commencer */}
        <Benefits />
        
        {/* 4. Comment ça marche - Processus simple */}
        <HowItWorks />
        
        {/* 5. Fonctionnalités détaillées */}
        <Features />
        
        {/* 6. CTA Final - Maintenant qu'ils connaissent les avantages */}
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
