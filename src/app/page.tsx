import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { BondingVisualizer } from "@/components/visualizer/BondingVisualizer";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { ArrowRight, Zap, ShieldCheck } from "lucide-react";

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

      {/* Final Call to Action Section */}
      <section className="py-24 bg-surface-300/60 border-t border-white/5 relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
            <Zap className="h-3.5 w-3.5 text-accent-green" />
            INSTANT CLOUD RELAY DEPLOYMENT
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Ready for More Resilient Connectivity?
          </h2>

          <p className="text-base text-zinc-300 max-w-xl mx-auto leading-relaxed">
            Deploy a private VERZ cloud relay in Chicago, New York, or Frankfurt when you need it, with hourly usage and no long-term contract.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/hub"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-black font-bold text-sm uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-xl"
            >
              <span>Launch VERZ Hub</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="pt-6 flex items-center justify-center gap-6 text-xs text-zinc-400 font-mono">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-accent-green" />
              Live Service Monitoring
            </span>
            <span>•</span>
            <span>Zero-Waste Auto Destruction</span>
            <span>•</span>
            <span>No Hardware Lock-In</span>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
