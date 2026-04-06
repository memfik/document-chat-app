import { Navigation } from "../components/Navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <div className="px-5">{children}</div>
    </>
  );
}
