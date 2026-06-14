"use server";

import { revalidatePath } from "next/cache";
import { requireAdminAction } from "@/lib/admin-auth";
import prisma from "@/lib/prisma";

export async function setDoctorApproval(profileId: string, approved: boolean) {
  const session = await requireAdminAction();

  await prisma.$transaction([
    prisma.doctorProfile.update({
      where: { id: profileId },
      data: {
        isApprovedByAdmin: approved,
        approvedByAdminAt: approved ? new Date() : null,
        approvalRejectedAt: approved ? null : new Date(),
        approvalRejectionReason: approved ? null : "Approval revoked by administrator",
      },
    }),
    prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: approved ? "DOCTOR_VERIFIED" : "DOCTOR_UNVERIFIED",
        entity: "DoctorProfile",
        entityId: profileId,
        description: approved ? "Administrator approved a doctor." : "Administrator revoked doctor approval.",
      },
    }),
  ]);
  revalidatePath("/admin");
  revalidatePath("/admin/doctors");
}

export async function setDoctorVerified(profileId: string, verified: boolean) {
  const session = await requireAdminAction();

  await prisma.$transaction([
    prisma.doctorProfile.update({
      where: { id: profileId },
      data: { isVerified: verified, verifiedAt: verified ? new Date() : null },
    }),
    prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: verified ? "DOCTOR_VERIFIED" : "DOCTOR_UNVERIFIED",
        entity: "DoctorProfile",
        entityId: profileId,
        description: verified ? "Administrator verified doctor credentials." : "Administrator removed doctor verification.",
      },
    }),
  ]);
  revalidatePath("/admin");
  revalidatePath("/admin/doctors");
}
