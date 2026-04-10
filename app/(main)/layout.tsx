import { ClientShell } from "../components/layout/ClientShell";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientShell>{children}</ClientShell>;
}
