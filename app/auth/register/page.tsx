"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { User, Stethoscope, Mail, Lock, Phone, ArrowLeft } from "lucide-react";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"patient" | "doctor" | null>(
    null,
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (!termsAccepted) {
      toast.error("Please accept the Terms & Conditions");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: "/auth/verify-otp",
      });

      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }

      if (data) {
        sessionStorage.setItem("verifyEmail", email);
        await authClient.emailOtp.sendVerificationOtp({
          email,
          type: "email-verification",
        });
        toast.success("Verification code sent to your email!");
        router.push("/auth/verify-otp");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/auth/callback",
      });

      if (error) {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  if (!selectedRole) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 dark:bg-slate-950">
        <div className="w-full max-w-4xl">
          <div className="mb-12 text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600">
                <svg
                  className="h-6 w-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 6v12m-6-6h12" stroke="currentColor" />
                  <circle cx="12" cy="12" r="9" stroke="currentColor" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              Create an account
            </h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Choose your role to get started
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <button
              onClick={() => setSelectedRole("patient")}
              className="flex flex-col items-center gap-4 rounded-xl border border-slate-200 bg-white p-8 text-center transition-all hover:border-blue-500 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-500 dark:hover:bg-blue-950/30"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                <User className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Patient
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Assess symptoms, track health
                </p>
              </div>
            </button>

            <button
              onClick={() => setSelectedRole("doctor")}
              className="flex flex-col items-center gap-4 rounded-xl border border-slate-200 bg-white p-8 text-center transition-all hover:border-blue-500 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-500 dark:hover:bg-blue-950/30"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400">
                <Stethoscope className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Doctor
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Review assessments, consult
                </p>
              </div>
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-8 dark:bg-slate-950">
      <div className="w-full max-w-3xl">
        <button
          onClick={() => setSelectedRole(null)}
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to role selection
        </button>
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950">
              {selectedRole === "patient" ? (
                <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              ) : (
                <Stethoscope className="h-5 w-5 text-green-600 dark:text-green-400" />
              )}
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {selectedRole === "patient"
                ? "Patient Registration"
                : "Doctor Registration"}
            </h1>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Fill in your details below to create your account
          </p>
        </div>

        <form onSubmit={handleRegister}>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Full name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Email address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Phone number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+1 234 567 8900"
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  required
                />
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Must be at least 8 characters
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Confirm password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-1 focus:ring-blue-500"
            />
            <label
              htmlFor="terms"
              className="text-sm text-slate-600 dark:text-slate-400"
            >
              I agree to the{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms & Conditions
              </a>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 h-11 w-full rounded-lg bg-blue-600 font-medium text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading
              ? "Creating account..."
              : `Create ${selectedRole === "patient" ? "Patient" : "Doctor"} Account`}
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700"></div>
          <span className="text-xs text-slate-400">OR</span>
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700"></div>
        </div>

        <button
          onClick={handleGoogleSignUp}
          className="flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>
      </div>
    </main>
  );
}
