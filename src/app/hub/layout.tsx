import type { Metadata } from "next";
import { HubShell } from "@/components/hub/HubShell";

export const metadata: Metadata = {
  title: "VERZ Hub — Apps, Billing & Account",
  description: "Manage VERZ products, billing, access, and application settings.",
};

export default function HubLayout({ children }: { children: React.ReactNode }) {
  return <HubShell>{children}</HubShell>;
}
