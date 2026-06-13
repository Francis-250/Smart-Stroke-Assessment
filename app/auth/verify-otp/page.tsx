"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function VerifyOTP() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("verifyEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      toast.error("Please register first");
      router.push("/auth/register");
    }

    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [router]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const pastedArray = pastedData.split("");
    const newOtp = [...otp];

    for (let i = 0; i < Math.min(pastedArray.length, 6); i++) {
      if (pastedArray[i].match(/[0-9]/)) {
        newOtp[i] = pastedArray[i];
      }
    }

    setOtp(newOtp);

    const lastFilledIndex = newOtp.findLastIndex((val) => val !== "");
    if (lastFilledIndex < 5 && inputRefs.current[lastFilledIndex + 1]) {
      inputRefs.current[lastFilledIndex + 1]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      toast.error("Please enter the complete 6-digit code");
      return;
    }

    if (!email) {
      toast.error("Email not found. Please register again.");
      router.push("/auth/register");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.emailOtp.verifyEmail({
        email: email,
        otp: otpCode,
      });

      if (error) {
        toast.error(error.message || "Invalid verification code");
        setLoading(false);
        return;
      }

      if (data) {
        toast.success("Email verified successfully!");
        sessionStorage.removeItem("verifyEmail");
        router.push("/auth/login");
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      toast.error("Email not found. Please register again.");
      router.push("/auth/register");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email: email,
        type: "email-verification",
      });

      if (error) {
        toast.error(error.message || "Failed to resend code");
        setLoading(false);
        return;
      }

      toast.success("New verification code sent to your email!");
    } catch (error) {
      console.error("Resend error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-4 dark:bg-slate-950 md:px-8">
      <div className="grid max-w-lg items-center gap-12 lg:max-w-6xl lg:grid-cols-2">
        <div>
          <h2 className="text-4xl font-bold leading-tight text-slate-900 dark:text-slate-100 lg:text-5xl">
            Verify Your Identity
          </h2>
          <p className="mt-6 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            We&apos;ve sent a 6-digit verification code to your email address.
            Enter the code below to continue.
          </p>

          <div className="mt-6 text-sm text-slate-900 dark:text-slate-100 lg:mt-12">
            Didn&apos;t receive the code?{" "}
            <button
              onClick={handleResendCode}
              disabled={loading}
              className="ml-1 font-medium text-blue-600 hover:underline disabled:opacity-50 dark:text-blue-500"
            >
              Resend code
            </button>
          </div>
        </div>

        <div className="w-full max-w-md lg:ml-auto">
          <h1 className="mb-6 text-3xl font-bold text-slate-900 dark:text-slate-100">
            Enter OTP
          </h1>
          {email && (
            <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
              Verifying: <span className="font-medium">{email}</span>
            </p>
          )}

          <form className="space-y-6" onSubmit={handleVerify}>
            <div>
              <label className="mb-4 inline-block text-sm font-medium text-slate-700 dark:text-slate-300">
                Verification code
              </label>
              <div className="flex gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className="h-14 w-full rounded-lg border border-slate-200 bg-white text-center text-xl font-semibold text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  />
                ))}
              </div>
              <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
                Enter the 6-digit code sent to your email
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer rounded-lg bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <hr className="w-full border-slate-200 dark:border-slate-700" />
            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              or
            </p>
            <hr className="w-full border-slate-200 dark:border-slate-700" />
          </div>

          <div>
            <Link
              href="/auth/login"
              className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              ← Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
