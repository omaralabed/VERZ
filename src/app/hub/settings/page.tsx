import { Activity, Network, Settings, ShieldCheck, Video } from "lucide-react";

const registry = [
  ["VERZ Link", "link.verz.com", "Live", Network, "text-emerald-400"],
  ["VERZ Stream", "stream.verz.com", "Beta", Video, "text-cyan-400"],
  ["VERZ Voice", "voice.verz.com", "Coming soon", Activity, "text-violet-400"],
] as const;

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-7">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-white">App Registry Settings</h1>
        <p className="mt-2 text-sm text-zinc-400">View the independent products connected to the VERZ control plane.</p>
      </div>

      <section className="rounded-2xl border border-white/10 bg-surface-100 p-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-5">
          <Settings className="h-5 w-5 text-cyan-400" />
          <h2 className="font-black text-white">Registered products</h2>
        </div>
        <div className="mt-4 space-y-3">
          {registry.map(([name, host, status, Icon, color]) => (
            <div key={name} className="flex flex-col justify-between gap-3 rounded-xl border border-white/10 bg-black/25 p-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <Icon className={`h-5 w-5 ${color}`} />
                <div>
                  <p className="font-bold text-white">{name}</p>
                  <p className="font-mono text-xs text-zinc-500">{host}</p>
                </div>
              </div>
              <span className="w-fit rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs font-bold text-zinc-300">{status}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-emerald-400/15 bg-emerald-400/5 p-5">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
          <div>
            <h2 className="font-black text-white">Independent application infrastructure</h2>
            <p className="mt-1 text-sm leading-relaxed text-zinc-400">Hub controls identity, entitlement, and billing. Link, Stream, Voice, and future products operate independently so a product workload cannot overload the Hub.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
