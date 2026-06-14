import { redirect } from "next/navigation";
import { getServerSession } from "@/hooks/get-server-session";
import { roleHome } from "@/lib/auth-routing";

export function isDoctorRole(role?: string | null) {
  return role?.toLowerCase() === "doctor";
}

export async function requireDoctorPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/auth/login");
  }

  if (!isDoctorRole(session.user.role)) {
    redirect(roleHome(session.user.role));
  }

  return session;
}

export async function requireDoctorAction() {
  const session = await getServerSession();

  if (!session?.user || !isDoctorRole(session.user.role)) {
    throw new Error("Unauthorized");
  }

  return session;
}
