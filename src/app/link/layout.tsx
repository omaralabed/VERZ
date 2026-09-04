import type { Metadata } from "next";
import { LinkShell } from "@/components/link/LinkShell";

export const metadata: Metadata = {
  title: "VERZ Link — Bonding Relay Console",
  description: "Deploy and manage VERZ Link multi-WAN bonding relays and devices.",
};

export default function LinkLayout({ children }: { children: React.ReactNode }) {
  return <LinkShell>{children}</LinkShell>;
}
