"use client";

import { useState, useTransition } from "react";
import { setDoctorApproval, setDoctorVerified } from "@/actions/admin/doctors";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type AdminDoctorItem = {
  id: string;
  name: string;
  email: string;
  specialization: string;
  hospital: string;
  license: string;
  approved: boolean;
  verified: boolean;
  comments: number;
};

export function AdminDoctorsClient({ doctors }: { doctors: AdminDoctorItem[] }) {
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const run = (action: () => Promise<void>) => {
    setMessage(null);
    startTransition(async () => {
      try { await action(); } catch (error) { setMessage(error instanceof Error ? error.message : "Action failed."); }
    });
  };

  return (
    <div className="rounded-lg border overflow-hidden">
      {message && <p className="border-b px-4 py-3 text-xs text-destructive">{message}</p>}
      <div className="divide-y">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-4 py-4 items-center">
            <div className="lg:col-span-3 min-w-0"><p className="text-sm font-medium truncate">{doctor.name}</p><p className="text-xs text-muted-foreground truncate">{doctor.email}</p></div>
            <div className="lg:col-span-3"><p className="text-sm">{doctor.specialization}</p><p className="text-xs text-muted-foreground">{doctor.hospital}</p></div>
            <div className="lg:col-span-2"><p className="text-xs text-muted-foreground">License</p><p className="text-sm">{doctor.license}</p></div>
            <div className="lg:col-span-2 flex flex-wrap gap-1.5"><Badge variant={doctor.approved ? "secondary" : "outline"}>{doctor.approved ? "Approved" : "Pending"}</Badge><Badge variant={doctor.verified ? "secondary" : "outline"}>{doctor.verified ? "Verified" : "Unverified"}</Badge></div>
            <div className="lg:col-span-2 flex lg:justify-end gap-2">
              <Button variant="outline" size="sm" disabled={pending} onClick={() => run(() => setDoctorApproval(doctor.id, !doctor.approved))}>{doctor.approved ? "Revoke" : "Approve"}</Button>
              <Button size="sm" disabled={pending} onClick={() => run(() => setDoctorVerified(doctor.id, !doctor.verified))}>{doctor.verified ? "Unverify" : "Verify"}</Button>
            </div>
          </div>
        ))}
        {doctors.length === 0 && <p className="py-12 text-center text-sm text-muted-foreground">No doctor profiles found.</p>}
      </div>
    </div>
  );
}
