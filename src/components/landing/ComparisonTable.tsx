import { Check, X, Minus } from "lucide-react";

export function ComparisonTable() {
  const comparisons = [
    {
      feature: "Dedicated Clean IP Addresses",
      verz: "Yes (Dedicated VERZ Cloud Relay per user)",
      speedify: "No (Shared crowded exit servers)",
      peplink: "Extra $100+/mo cloud add-on",
      highlight: true,
    },
    {
      feature: "Hardware Freedom / Bring Your Own Router",
      verz: "Yes (Any $60 GL.iNet / OpenWrt / PC)",
      speedify: "Limited (Desktop/Phone only)",
      peplink: "No (Must buy $1,500+ proprietary blue box)",
      highlight: true,
    },
    {
      feature: "On-Demand Hourly Billing (Pay-As-You-Go)",
      verz: "Yes (From $0.25/hr via Prepaid Wallet)",
      speedify: "No (Rigid monthly contract only)",
      peplink: "No (Expensive annual plans)",
      highlight: true,
    },
    {
      feature: "Core Architecture & Protocol",
      verz: "VERZ High-Speed Multi-Path Core (Ultra-Low CPU)",
      speedify: "10-year-old user-space C/C++ engine",
      peplink: "SpeedFusion proprietary VPN",
      highlight: false,
    },
    {
      feature: "Self-Serve Developer REST API",
      verz: "Yes (Instant API keys on hub.verz.com)",
      speedify: "No (Sales call & NDA required)",
      peplink: "Complex SNMP / InControl2 API only",
      highlight: false,
    },
    {
      feature: "All-in-One Broadcast Ecosystem (Stream + SIP)",
      verz: "Yes (Modular apps under one Central Hub)",
      speedify: "No (Bonding only)",
      peplink: "No (Router hardware only)",
      highlight: false,
    },
  ];

  return (
    <section id="comparison" className="py-20 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-accent-cyan mb-3">
            Competitive Reality
          </h2>
          <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            How Verz Outperforms the Old Alternatives.
          </h3>
          <p className="mt-4 text-base text-zinc-400">
            Speedify is an outdated consumer VPN app. Peplink charges thousands for locked hardware. Verz gives you modern enterprise power with total freedom.
          </p>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-surface-100/80 backdrop-blur-md shadow-2xl">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/10 bg-surface-200/60">
                <th className="p-5 text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Feature / Capability
                </th>
                <th className="p-5 text-sm font-bold text-accent-cyan bg-accent-cyan/10 border-x border-accent-cyan/20 w-1/3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent-green animate-pulse" />
                    VERZ LINK (verz.com)
                  </div>
                </th>
                <th className="p-5 text-sm font-semibold text-zinc-300 w-1/4">
                  Speedify
                </th>
                <th className="p-5 text-sm font-semibold text-zinc-300 w-1/4">
                  Peplink SpeedFusion
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {comparisons.map((row, index) => (
                <tr
                  key={index}
                  className={`hover:bg-white/[0.02] transition-colors ${
                    row.highlight ? "bg-white/[0.01]" : ""
                  }`}
                >
                  <td className="p-5 font-medium text-white">
                    {row.feature}
                  </td>
                  <td className="p-5 font-semibold text-accent-cyan bg-accent-cyan/5 border-x border-accent-cyan/15">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-accent-green shrink-0" />
                      <span>{row.verz}</span>
                    </div>
                  </td>
                  <td className="p-5 text-zinc-400">
                    <div className="flex items-center gap-2">
                      <X className="h-4 w-4 text-red-400 shrink-0" />
                      <span>{row.speedify}</span>
                    </div>
                  </td>
                  <td className="p-5 text-zinc-400">
                    <div className="flex items-center gap-2">
                      <X className="h-4 w-4 text-red-400 shrink-0" />
                      <span>{row.peplink}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Banner */}
        <div className="mt-8 p-6 rounded-xl bg-surface-200/70 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <h4 className="text-base font-bold text-white">Ready to experience the difference?</h4>
            <p className="text-xs text-zinc-400 mt-0.5">Test our Chicago or New York VERZ Cloud relays with $25 in free beta credits.</p>
          </div>
          <a
            href="/hub"
            className="px-6 py-2.5 rounded-lg bg-accent-cyan text-background font-bold text-xs uppercase tracking-wider hover:bg-accent-cyan/90 transition-all shadow-glow"
          >
            Deploy First Node →
          </a>
        </div>
      </div>
    </section>
  );
}
