"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Network,
  Wallet,
  Key,
  Settings,
  Server,
  Activity,
  Layers,
  LogOut,
  ChevronDown,
  Plus,
  ArrowLeft,
} from "lucide-react";

export default function HubLayout({ children }: { children: React.ReactNode }) {
  const [walletBalance, setWalletBalance] = useState<number>(45.5);
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);

  const addCredits = (amount: number) => {
    setWalletBalance((prev) => prev + amount);
    setIsTopUpOpen(false);
  };

  return (
    <div className="flex h-screen w-full bg-background text-zinc-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/15 bg-[#0A0D14] flex flex-col justify-between shrink-0 hidden md:flex">
        <div>
          {/* Brand Header */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-white/10 bg-black/40">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black font-mono font-black text-base shadow-sm">
                V
              </div>
              <span className="font-mono text-base font-black tracking-widest text-white">
                VERZ<span className="text-accent-cyan">.HUB</span>
              </span>
            </Link>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-zinc-200 border border-white/15">
              v1.0
            </span>
          </div>

          {/* Backbone Status Badge */}
          <div className="px-4 py-3 border-b border-white/10">
            <div className="p-3 rounded-xl bg-white/5 border border-white/15 relative overflow-hidden shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                </span>
                <span className="text-xs font-mono font-black text-white tracking-wider uppercase">
                  VERZ GLOBAL BACKBONE
                </span>
              </div>
              <p className="text-[11px] font-mono text-zinc-400 pl-4">
                All Systems Operational • 99.99% SLA
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-6 text-sm">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold px-2 block mb-3">
                Core Application
              </span>
              <ul className="space-y-1.5">
                <li>
                  <Link
                    href="/hub"
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/10 text-white font-bold text-sm border-2 border-white/30 shadow-md transition-all hover:border-white/50"
                  >
                    <div className="flex items-center gap-3">
                      <Network className="h-4 w-4 text-emerald-400" />
                      <span className="text-white font-bold">Verz Link (Bonding)</span>
                    </div>
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold px-2 block mb-3">
                Cloud & Account
              </span>
              <ul className="space-y-1.5">
                <li>
                  <Link
                    href="/hub#wallet"
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-zinc-200 hover:bg-white/10 hover:text-white font-semibold text-sm transition-colors"
                  >
                    <Wallet className="h-4 w-4 text-amber-400" />
                    <span>Wallet & Billing</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hub#api-keys"
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-zinc-200 hover:bg-white/10 hover:text-white font-semibold text-sm transition-colors"
                  >
                    <Key className="h-4 w-4 text-sky-400" />
                    <span>Developer API Keys</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hub#settings"
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-zinc-200 hover:bg-white/10 hover:text-white font-semibold text-sm transition-colors"
                  >
                    <Settings className="h-4 w-4 text-zinc-300" />
                    <span>App Registry Settings</span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 space-y-3 bg-black/40">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-xs font-mono font-bold text-zinc-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 px-3 py-2.5 rounded-xl transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-zinc-300" />
            <span>Back to verz.com</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 border-b border-white/15 bg-black/60 backdrop-blur-md px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              VERZ Global Backbone • All Systems Operational
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Wallet Balance Widget */}
            <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-surface-100 border-2 border-white/20 shadow-sm">
              <Wallet className="h-4 w-4 text-emerald-400" />
              <div className="flex flex-col">
                <span className="text-[10px] font-mono font-bold text-zinc-300 uppercase leading-none">
                  Credit Wallet
                </span>
                <span className="text-sm font-mono font-black text-white leading-tight mt-0.5">
                  ${walletBalance.toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => setIsTopUpOpen(true)}
                className="ml-2 px-3 py-1 rounded-lg bg-white text-black font-mono text-xs font-black hover:bg-zinc-200 transition-colors shadow-sm"
              >
                + Top Up
              </button>
            </div>

            {/* Profile Avatar */}
            <div className="h-9 w-9 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center text-xs font-mono font-black text-white shadow-sm">
              OA
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-background bg-grid-pattern">
          {children}
        </main>
      </div>

      {/* Top Up Wallet Modal */}
      {isTopUpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-surface-100 border border-white/10 p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Top Up Credit Wallet</h3>
            <p className="text-xs text-zinc-400 mt-1">
              Add prepaid credits to power on-demand VERZ Cloud bonding nodes and API calls.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6">
              {[25, 50, 100].map((amt) => (
                <button
                  key={amt}
                  onClick={() => addCredits(amt)}
                  className="p-4 rounded-xl bg-surface-200 border border-white/10 hover:border-accent-cyan hover:bg-accent-cyan/10 transition-all text-center"
                >
                  <div className="text-xl font-mono font-black text-white">+${amt}</div>
                  <div className="text-[10px] font-mono text-zinc-400 mt-1">
                    ~{Math.round(amt / 0.65)} Pro Hours
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
              <button
                onClick={() => setIsTopUpOpen(false)}
                className="px-4 py-2 rounded-lg text-xs font-mono text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
