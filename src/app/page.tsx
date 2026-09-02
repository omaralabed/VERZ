import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { BondingVisualizer } from "@/components/visualizer/BondingVisualizer";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { ComparisonTable } from "@/components/landing/ComparisonTable";

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen bg-background bg-grid-pattern">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />

      {/* Interactive Simulator Section */}
      <section id="interactive-demo" className="py-12 relative z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BondingVisualizer />
        </div>
      </section>

      {/* Core Features */}
      <FeaturesGrid />

      {/* Direct Head-to-Head Comparison */}
      <ComparisonTable />

      <Footer />
    </main>
  );
}
