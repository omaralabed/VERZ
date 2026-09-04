import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Terminal, Server, Wifi } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-radial-gradient pointer-events-none" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-radial-green pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Release Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-100 border border-white/10 text-xs font-mono text-zinc-300 mb-8 shadow-glow">
          <span className="flex h-2 w-2 rounded-full bg-accent-green animate-pulse" />
          <span>VERZ Link 1.0 Live</span>
          <span className="text-zinc-600">|</span>
          <span className="text-accent-cyan font-semibold">1-Click Dedicated VERZ Cloud Relays</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-[1.08]">
          Resilient Internet for{" "}
          <span className="bg-gradient-to-r from-accent-cyan via-accent-green to-white bg-clip-text text-transparent">
            Starlink, 5G & Live Video.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-normal">
          Combine Wi-Fi, 5G, and satellite connections into <strong>one adaptive path</strong> designed to keep OBS, Zoom, and live production connected through network changes.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/hub"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-black transition-all hover:bg-zinc-200 hover:scale-[1.02] shadow-xl"
          >
            <span>Launch VERZ Hub</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="#interactive-demo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-surface-100 border border-white/10 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-surface-50 hover:border-white/20"
          >
            <Zap className="h-5 w-5 text-accent-green" />
            <span>Interactive Simulator</span>
          </Link>
        </div>

        {/* Trust Metrics Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-white/5 max-w-4xl mx-auto text-left">
          <div className="space-y-1">
            <div className="text-2xl font-mono font-black text-white">Multi-WAN</div>
            <div className="text-xs text-zinc-400 font-mono">Adaptive Path Selection</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-mono font-black text-white">On-Demand</div>
            <div className="text-xs text-zinc-400 font-mono">VERZ Relay Provisioning</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-mono font-black text-white">Dedicated</div>
            <div className="text-xs text-zinc-400 font-mono">Isolated Relay Options</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-mono font-black text-white">Flexible</div>
            <div className="text-xs text-zinc-400 font-mono">Software & Router Clients</div>
          </div>
        </div>
      </div>
    </section>
  );
}
