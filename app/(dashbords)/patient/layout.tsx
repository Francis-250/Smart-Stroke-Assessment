import PatientNav from "@/components/layout/patient-nav";

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <PatientNav />
      <main className="pb-20 sm:pb-0">{children}</main>
    </div>
  );
}
