"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { patientAssignDoctor } from "@/actions/assignments";
import { submitDoctorFeedback } from "@/actions/doctor-feedback";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type Doctor = {
  id: string;
  name: string;
  specialization: string;
  hospital: string;
};

export function PatientDoctorAssignment({
  assessmentId,
  doctors,
  assignedDoctorId,
  existingFeedback,
}: {
  assessmentId: string;
  doctors: Doctor[];
  assignedDoctorId?: string;
  existingFeedback?: string;
}) {
  const [doctorId, setDoctorId] = useState(assignedDoctorId ?? "");
  const [comment, setComment] = useState(existingFeedback ?? "");
  const [pending, startTransition] = useTransition();

  const assign = () =>
    startTransition(async () => {
      try {
        await patientAssignDoctor({ assessmentId, doctorProfileId: doctorId });
        toast.success("Doctor assigned to this assessment.");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Unable to assign doctor.");
      }
    });

  const submitFeedback = () =>
    startTransition(async () => {
      try {
        await submitDoctorFeedback({ assessmentId, doctorProfileId: doctorId, comment });
        toast.success("Your feedback was sent to the admin team.");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Unable to submit feedback.");
      }
    });

  return (
    <div className="rounded-lg border p-5 space-y-5">
      <div>
        <p className="text-sm font-medium">Assigned doctor</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Choose an approved doctor to review this assessment.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Select value={doctorId} onValueChange={setDoctorId} disabled={pending}>
          <SelectTrigger className="flex-1"><SelectValue placeholder="Select approved doctor" /></SelectTrigger>
          <SelectContent>
            {doctors.map((doctor) => (
              <SelectItem key={doctor.id} value={doctor.id}>
                {doctor.name} · {doctor.specialization} · {doctor.hospital}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={assign} disabled={pending || !doctorId}>
          {assignedDoctorId ? "Reassign" : "Assign doctor"}
        </Button>
      </div>
      {doctors.length === 0 && (
        <p className="text-xs text-muted-foreground">No approved doctors are currently available.</p>
      )}
      {assignedDoctorId && doctorId === assignedDoctorId && (
        <div className="space-y-2 border-t pt-5">
          <Label htmlFor="doctor-feedback">Comment about this doctor for administrators</Label>
          <Textarea
            id="doctor-feedback"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Describe your experience or concern..."
            rows={4}
          />
          <Button variant="outline" onClick={submitFeedback} disabled={pending || comment.trim().length < 10}>
            Send feedback to admin
          </Button>
        </div>
      )}
    </div>
  );
}
