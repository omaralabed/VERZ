"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  KeyRound,
  Menu,
  Network,
  PanelsTopLeft,
  Wallet,
  X,
} from "lucide-react";
import { VerzLogo } from "@/components/ui/VerzLogo";

export function LinkShell({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const closeMobileNav = () => setMobileNavOpen(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-zinc-100">
      {mobileNavOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
          aria-label="Close navigation"
          onClick={closeMobileNav}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 shrink-0 flex-col justify-between border-r border-white/15 bg-[#0A0D14] transition-transform md:static md:w-64 md:translate-x-0 ${
          mobileNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="VERZ Link navigation"
      >
        <div>
          <div className="flex h-16 items-center justify-between border-b border-white/10 bg-black/40 px-5">
            <Link href="/link" className="flex items-center" onClick={closeMobileNav}>
              <VerzLogo size="sm" subtext="LINK" />
            </Link>
            <button
              type="button"
              className="rounded-lg p-2 text-zinc-300 hover:bg-white/10 hover:text-white md:hidden"
              aria-label="Close navigation"
              onClick={closeMobileNav}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="space-y-6 p-4 text-sm">
            <div>
              <span className="mb-3 block px-2 font-mono text-xs font-bold uppercase tracking-wider text-zinc-400">
                Product
              </span>
              <Link
                href="/link"
                aria-current="page"
                onClick={closeMobileNav}
                className="flex items-center justify-between rounded-xl border-2 border-emerald-400/35 bg-white/10 px-3.5 py-2.5 font-bold text-white"
              >
                <span className="flex items-center gap-3">
                  <Network className="h-4 w-4 text-emerald-400" />
                  Relay Fleet
                </span>
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              </Link>
            </div>

            <div>
              <span className="mb-3 block px-2 font-mono text-xs font-bold uppercase tracking-wider text-zinc-400">
                VERZ Platform
              </span>
              <div className="space-y-1.5">
                <Link
                  href="/hub"
                  onClick={closeMobileNav}
                  className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 font-semibold text-zinc-200 hover:bg-white/10 hover:text-white"
                >
                  <PanelsTopLeft className="h-4 w-4 text-cyan-400" />
                  App Hub
                </Link>
                <Link
                  href="/hub/billing"
                  onClick={closeMobileNav}
                  className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 font-semibold text-zinc-200 hover:bg-white/10 hover:text-white"
                >
                  <Wallet className="h-4 w-4 text-amber-400" />
                  Wallet & Billing
                </Link>
                <Link
                  href="/hub/api-keys"
                  onClick={closeMobileNav}
                  className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 font-semibold text-zinc-200 hover:bg-white/10 hover:text-white"
                >
                  <KeyRound className="h-4 w-4 text-sky-400" />
                  Developer API
                </Link>
              </div>
            </div>
          </nav>
        </div>

        <div className="border-t border-white/10 bg-black/40 p-4">
          <Link
            href="/hub"
            onClick={closeMobileNav}
            className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 font-mono text-xs font-bold text-zinc-200 hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to VERZ Hub
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-white/15 bg-black/60 px-3 backdrop-blur-md sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              className="shrink-0 rounded-lg border border-white/15 bg-white/5 p-2 text-white md:hidden"
              aria-label="Open navigation"
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            <span className="truncate font-mono text-xs font-bold uppercase tracking-wider text-white">
              <span className="hidden lg:inline">VERZ Link Control Plane • </span>Operational
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href="/hub/billing"
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-surface-100 px-2.5 py-1.5 hover:border-white/35 sm:px-3.5"
            >
              <Wallet className="hidden h-4 w-4 text-emerald-400 sm:block" />
              <span className="font-mono text-sm font-black text-white">$45.50</span>
            </Link>
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 font-mono text-xs font-black text-white">
              OA
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-background bg-grid-pattern p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
