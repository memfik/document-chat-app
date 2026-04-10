import { ClientShell } from "../components/ClientShell";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientShell>{children}</ClientShell>;
}
