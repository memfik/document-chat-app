"use client";

import { useState } from "react";
import { Navigation } from "./Navigation";
import { Sidebar } from "./Sidebar";

export function ClientShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
        <div style={{ flexShrink: 0 }}>
          <Navigation onMenuClick={() => setMobileOpen(true)} />
        </div>
        <main style={{ flex: 1, overflowY: "auto", minWidth: 0 }}>{children}</main>
      </div>
    </div>
  );
}
