import { Cpu, ShieldCheck, Zap, Server, Network, Wifi, Layers, Radio, Globe } from "lucide-react";

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
        "Say goodbye to shared crowded exit nodes. Every stream gets a fresh, dedicated VERZ Cloud instance with a clean IP that is never blacklisted by YouTube or Netflix.",
      badge: "Clean Dedicated IP",
    },
    {
      icon: ShieldCheck,
      title: "0ms Failover & Packet Cloning",
      description:
        "For mission-critical live streams, Zoom calls, and esports: duplicate packets across all links. If your cable is cut, the backup packet wins with zero jitter.",
      badge: "Unbreakable",
    },
    {
      icon: Network,
      title: "Hardware-Agnostic ($60 Routers)",
      description:
        "Run Verz Link on Windows, Mac, Linux, or flash it onto cheap $60 GL.iNet travel routers and Raspberry Pis. Don't pay $2,000 for locked hardware.",
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
      title: "Central Multi-App Hub & API",
      description:
        "Manage your nodes, prepaid credit wallet, and future apps (Verz Stream & Verz Voice) from one unified AWS-style developer console.",
      badge: "Headless REST API",
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
            Consumer VPNs drop frames when cellular signals fluctuate. Verz is architected to keep live streams smooth no matter what happens to your physical links.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="group relative p-6 sm:p-8 rounded-2xl bg-surface-100/90 border border-white/5 hover:border-accent-cyan/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl bg-surface-50 border border-white/10 text-accent-cyan group-hover:bg-accent-cyan group-hover:text-background transition-all">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 text-zinc-400 border border-white/5 group-hover:border-accent-cyan/20 transition-colors">
                    {f.badge}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-accent-cyan transition-colors">
                  {f.title}
                </h4>
                <p className="text-sm text-zinc-400 leading-relaxed font-normal">
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
