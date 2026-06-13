"use client";

import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/useSession";

export default function PatientDashboard() {
  const router = useRouter();
  const { session, isLoading, signOut, isSigningOut } = useSession();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    router.push("/auth/login");
    return null;
  }

  const user = session.user;

  const handleSignOut = () => {
    signOut();
    router.push("/auth/login");
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-slate-600 dark:text-slate-400">
        Welcome, {user.name || user.email}
      </span>
      <button
        onClick={handleSignOut}
        disabled={isSigningOut}
        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors disabled:opacity-50"
      >
        {isSigningOut ? "Signing out..." : "Sign Out"}
      </button>
    </div>
  );
}
