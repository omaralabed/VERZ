import { Cpu, ShieldCheck, Server, Network, Radio, Globe } from "lucide-react";

export function FeaturesGrid() {
  const features = [
    {
      icon: Cpu,
      title: "Proprietary High-Speed Kernel Core",
      description:
        "Built on modern high-performance memory-safe architecture. Consumes up to 80% less CPU and battery than legacy consumer bonding VPNs.",
      badge: "Ultra-Low CPU",
    },
    {
      icon: Server,
      title: "Dedicated VERZ Cloud Relays",
      description:
        "Choose an isolated VERZ Cloud relay with dedicated compute and a public IP that is not shared with other VERZ customers.",
      badge: "Isolated Relay",
    },
    {
      icon: ShieldCheck,
      title: "Fast Failover & Packet Cloning",
      description:
        "For high-priority traffic, duplicate selected packets across multiple links so another available path can carry traffic when one connection degrades.",
      badge: "Resilient",
    },
    {
      icon: Network,
      title: "Hardware-Agnostic ($60 Routers)",
      description:
        "Run VERZ Link on Windows, Mac, Linux, or compatible travel routers and Raspberry Pi devices without proprietary hardware lock-in.",
      badge: "Bring Your Own Router",
    },
    {
      icon: Radio,
      title: "Built for Starlink + Dual 5G",
      description:
        "Specifically calibrated to absorb Starlink satellite micro-handoff drops and 5G cellular jitter spikes before they reach your broadcast software.",
      badge: "Nomad & Field Ready",
    },
    {
      icon: Globe,
      title: "Unified Link Control & API",
      description:
        "Manage VERZ Link relays, paired devices, and prepaid credits from one console with API access for automation.",
      badge: "Control Plane API",
    },
  ];

  return (
    <section id="features" className="py-20 bg-surface-300/40 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-accent-cyan mb-3">
            Core Technology
          </h2>
          <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Engineered for High-Stakes Broadcast & Field Operations.
          </h3>
          <p className="mt-4 text-base text-zinc-400">
            Consumer VPNs can struggle when cellular signals fluctuate. VERZ is designed to keep traffic moving across the connections that remain available.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="group relative p-6 sm:p-8 rounded-2xl bg-surface-100/90 border border-white/10 hover:border-white/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_35px_-5px_rgba(255,255,255,0.08)] overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white group-hover:bg-white/10 group-hover:border-white/25 transition-all shadow-sm">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 text-zinc-300 border border-white/10 group-hover:border-white/20 transition-colors">
                    {f.badge}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white mb-2 tracking-tight">
                  {f.title}
                </h4>
                <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
