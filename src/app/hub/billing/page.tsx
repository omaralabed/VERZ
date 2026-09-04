"use client";

import { useState } from "react";
import { CreditCard, Receipt, ShieldCheck, Wallet } from "lucide-react";

export default function BillingPage() {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [notice, setNotice] = useState("");

  return (
    <div className="mx-auto max-w-6xl space-y-7">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-white">Wallet & Billing</h1>
        <p className="mt-2 text-sm text-zinc-400">Manage prepaid credits and review usage across every VERZ app.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <section className="rounded-2xl border border-white/10 bg-surface-100 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400">Available balance</p>
              <p className="mt-2 text-4xl font-black text-white">$45.50</p>
            </div>
            <span className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-emerald-400">
              <Wallet className="h-6 w-6" />
            </span>
          </div>
          <div className="mt-7 border-t border-white/10 pt-6">
            <h2 className="font-bold text-white">Add prepaid credits</h2>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[25, 50, 100].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  aria-pressed={selectedAmount === amount}
                  onClick={() => {
                    setSelectedAmount(amount);
                    setNotice("");
                  }}
                  className={`rounded-xl border px-3 py-4 font-mono text-lg font-black transition-colors ${
                    selectedAmount === amount
                      ? "border-white bg-white text-black"
                      : "border-white/15 bg-black/30 text-white hover:border-white/35"
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setNotice("Stripe Checkout will open here after the production billing connection is enabled. No credits were added.")}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-black text-black hover:bg-zinc-200"
            >
              <CreditCard className="h-4 w-4" />
              Continue to secure checkout · ${selectedAmount}
            </button>
            {notice && (
              <p role="status" className="mt-3 rounded-lg border border-amber-400/20 bg-amber-400/10 p-3 text-sm text-amber-200">
                {notice}
              </p>
            )}
            <p className="mt-3 flex items-center justify-center gap-2 text-xs text-zinc-500">
              <ShieldCheck className="h-3.5 w-3.5" /> Payments will be processed by Stripe; VERZ will not store card details.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-surface-100 p-6">
          <div className="flex items-center gap-3">
            <Receipt className="h-5 w-5 text-cyan-400" />
            <h2 className="font-black text-white">Recent usage</h2>
          </div>
          <div className="mt-5 space-y-3">
            {[
              ["VERZ Link · Dedicated relay", "-$0.229", "Today · hourly usage"],
              ["VERZ Link · Shared relay", "-$0.022", "Today · hourly usage"],
              ["Wallet credit", "+$50.00", "Aug 28 · completed"],
            ].map(([name, amount, meta]) => (
              <div key={`${name}-${meta}`} className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/25 p-4">
                <div>
                  <p className="text-sm font-bold text-white">{name}</p>
                  <p className="mt-1 text-xs text-zinc-500">{meta}</p>
                </div>
                <span className={`font-mono text-sm font-black ${amount.startsWith("+") ? "text-emerald-400" : "text-zinc-200"}`}>
                  {amount}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
