import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CircleDollarSign,
  CloudCog,
  Network,
  ShieldCheck,
} from "lucide-react";

const products = [
  {
    name: "VERZ Link",
    description: "Deploy private and shared multi-WAN bonding relays for field devices and live production.",
    hostname: "link.verz.com",
    status: "Live",
    icon: Network,
    accent: "text-emerald-400",
    border: "hover:border-emerald-400/45",
    href: "/link",
  },
];

export default function HubPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="flex flex-col justify-between gap-5 border-b border-white/10 pb-7 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 font-mono text-xs font-bold text-cyan-300">
            <CloudCog className="h-3.5 w-3.5" />
            VERZ CONTROL PLANE
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">VERZ Hub</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
            Manage your VERZ Link service, account, and billing from one secure place.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3.5 py-2 font-mono text-xs font-bold text-emerald-300">
          <Activity className="h-4 w-4" />
          Platform operational
        </div>
      </section>

      <section aria-labelledby="products-heading">
        <div className="mb-4 flex items-center justify-between">
          <h2 id="products-heading" className="text-lg font-black text-white">Your Product</h2>
          <span className="font-mono text-xs text-zinc-500">Active</span>
        </div>
        <div className="grid gap-4">
          {products.map((product) => {
            const Icon = product.icon;
            const content = (
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <span className="w-fit rounded-xl border border-white/10 bg-white/5 p-3.5">
                    <Icon className={`h-6 w-6 ${product.accent}`} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-black text-white">{product.name}</h3>
                    <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 font-mono text-[11px] font-bold text-emerald-300">
                      {product.status}
                    </span>
                  </div>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">{product.description}</p>
                  <p className="mt-3 font-mono text-xs text-zinc-500">{product.hostname}</p>
                </div>
                {product.href && (
                  <span className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-mono text-xs font-black text-black transition-colors group-hover:bg-emerald-300">
                    Open VERZ Link <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </div>
            );

            return product.href ? (
              <Link
                key={product.name}
                href={product.href}
                className={`group rounded-2xl border border-white/10 bg-surface-100 p-5 transition-all hover:-translate-y-0.5 hover:bg-surface-50 sm:p-6 ${product.border}`}
              >
                {content}
              </Link>
            ) : (
              <article key={product.name} className="rounded-2xl border border-white/10 bg-surface-100/65 p-5">
                {content}
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Link href="/hub/billing" className="rounded-2xl border border-white/10 bg-surface-100 p-5 hover:border-white/25">
          <div className="flex items-center justify-between">
            <CircleDollarSign className="h-5 w-5 text-amber-400" />
            <ArrowRight className="h-4 w-4 text-zinc-500" />
          </div>
          <p className="mt-6 font-mono text-xs uppercase tracking-wider text-zinc-400">Credit wallet</p>
          <p className="mt-1 text-2xl font-black text-white">$45.50</p>
          <p className="mt-1 text-xs text-zinc-500">Shared across authorized VERZ products</p>
        </Link>
        <div className="rounded-2xl border border-white/10 bg-surface-100 p-5">
          <ShieldCheck className="h-5 w-5 text-emerald-400" />
          <p className="mt-6 font-mono text-xs uppercase tracking-wider text-zinc-400">Account security</p>
          <p className="mt-1 text-lg font-black text-white">SSO session active</p>
          <p className="mt-1 text-xs text-zinc-500">Product access is issued by VERZ Hub</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-surface-100 p-5">
          <Activity className="h-5 w-5 text-cyan-400" />
          <p className="mt-6 font-mono text-xs uppercase tracking-wider text-zinc-400">Current usage</p>
          <p className="mt-1 text-lg font-black text-white">2 Link relays active</p>
          <p className="mt-1 text-xs text-zinc-500">Usage events synchronize with Hub billing</p>
        </div>
      </section>
    </div>
  );
}
