"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function VerifyOTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-4 md:px-8">
      <div className="grid max-w-lg items-center gap-12 lg:max-w-6xl lg:grid-cols-2">
        <div>
          <h2 className="text-4xl font-bold leading-tight text-gray-900 dark:text-gray-100 lg:text-5xl">
            Verify Your Identity
          </h2>
          <p className="mt-6 text-base leading-relaxed text-gray-600 dark:text-gray-400">
            We&apos;ve sent a 6-digit verification code to your email address.
            Enter the code below to continue.
          </p>

          <div className="mt-6 text-sm text-gray-900 dark:text-gray-100 lg:mt-12">
            Didn&apos;t receive the code?{" "}
            <button className="ml-1 font-medium text-blue-600 hover:underline dark:text-blue-500">
              Resend code
            </button>
          </div>
        </div>

        <div className="w-full max-w-md lg:ml-auto">
          <h1 className="mb-10 text-3xl font-bold text-gray-900 dark:text-gray-100">
            Enter OTP
          </h1>

          <form className="space-y-6">
            <div>
              <label className="mb-4 inline-block text-sm font-medium text-gray-700 dark:text-gray-300">
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
                    className="h-14 w-full rounded-md border border-gray-300 bg-white text-center text-xl font-semibold text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  />
                ))}
              </div>
              <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                Enter the 6-digit code sent to your email
              </p>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer rounded-md bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              Verify
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <hr className="w-full border-gray-300 dark:border-gray-700" />
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              or
            </p>
            <hr className="w-full border-gray-300 dark:border-gray-700" />
          </div>

          <div>
            <Link
              href="/auth/login"
              className="flex w-full items-center justify-center gap-2.5 rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              ← Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
