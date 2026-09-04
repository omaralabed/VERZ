import { KeyRound, LockKeyhole, ShieldCheck } from "lucide-react";

export default function ApiKeysPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-7">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-white">Developer API Keys</h1>
        <p className="mt-2 text-sm text-zinc-400">Manage credentials for your own VERZ integrations. Product-server credentials remain private to VERZ.</p>
      </div>

      <section className="rounded-2xl border border-white/10 bg-surface-100 p-6">
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-cyan-400">
              <KeyRound className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-black text-white">Account API key</h2>
              <p className="text-xs text-zinc-500">For automation under your VERZ organization</p>
            </div>
          </div>
          <span className="w-fit rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 font-mono text-xs font-bold text-emerald-300">Active</span>
        </div>
        <div className="grid gap-4 py-5 sm:grid-cols-3">
          <div>
            <p className="font-mono text-xs uppercase text-zinc-500">Name</p>
            <p className="mt-1 text-sm font-bold text-white">Production automation</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase text-zinc-500">Token</p>
            <p className="mt-1 font-mono text-sm font-bold text-white">vz_live_••••••••••92</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase text-zinc-500">Scope</p>
            <p className="mt-1 text-sm font-bold text-white">Link: read & deploy</p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-100">
          <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0" />
          New keys will be shown once at creation. Store them securely and rotate them immediately if exposed.
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-surface-100 p-5">
          <ShieldCheck className="h-5 w-5 text-emerald-400" />
          <h2 className="mt-5 font-black text-white">Scoped permissions</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">Use separate credentials for each integration and grant only the product actions it requires.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-surface-100 p-5">
          <KeyRound className="h-5 w-5 text-cyan-400" />
          <h2 className="mt-5 font-black text-white">Server-to-server access</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">VERZ product services authenticate through internal credentials that are never displayed in customer UI.</p>
        </div>
      </section>
    </div>
  );
}
