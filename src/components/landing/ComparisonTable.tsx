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
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 mb-3 block">
            Competitive Comparison
          </span>
          <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            How Verz Outperforms the Old Alternatives.
          </h3>
          <p className="mt-4 text-base text-zinc-300">
            Speedify is an outdated consumer VPN app. Peplink charges thousands for locked hardware. Verz gives you modern enterprise power with total freedom.
          </p>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-surface-100/90 shadow-2xl">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/10 bg-surface-200 text-sm">
                <th className="p-5 font-semibold text-zinc-300">
                  Feature / Capability
                </th>
                <th className="p-5 font-bold text-white bg-white/5 border-x border-white/10 w-1/3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent-green animate-pulse" />
                    VERZ LINK
                  </div>
                </th>
                <th className="p-5 font-semibold text-zinc-400 w-1/4">
                  Speedify
                </th>
                <th className="p-5 font-semibold text-zinc-400 w-1/4">
                  Peplink SpeedFusion
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {comparisons.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-white/[0.03] transition-colors"
                >
                  <td className="p-5 font-medium text-zinc-200">
                    {row.feature}
                  </td>
                  <td className="p-5 font-semibold text-white bg-white/[0.04] border-x border-white/10">
                    <div className="flex items-center gap-2.5">
                      <Check className="h-4 w-4 text-accent-green shrink-0" />
                      <span className="text-white">{row.verz}</span>
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
        <div className="mt-8 p-6 rounded-xl bg-surface-200 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <h4 className="text-base font-bold text-white">Ready to experience the difference?</h4>
            <p className="text-xs text-zinc-300 mt-0.5">Test our Chicago or New York VERZ Cloud relays with $25 in free beta credits.</p>
          </div>
          <a
            href="/hub"
            className="px-6 py-3 rounded-lg bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-lg"
          >
            Deploy First Node →
          </a>
        </div>
      </div>
    </section>
  );
}
