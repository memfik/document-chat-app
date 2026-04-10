"use client";

import { useState } from "react";
import { Navigation } from "./Navigation";
import { Sidebar } from "./Sidebar";

export function ClientShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ flexShrink: 0 }}>
        <Navigation onMenuClick={() => setMobileOpen(true)} />
      </div>
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Sidebar
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />
        <main style={{ flex: 1, overflowY: "auto" }}>{children}</main>
      </div>
    </div>
  );
}
