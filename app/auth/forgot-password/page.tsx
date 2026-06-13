"use client";

import React, { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await authClient.requestPasswordReset({
      email,
      redirectTo: "/auth/reset-password",
    });

    if (error) {
      toast.error(error.message);
      return;
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-4 md:px-8">
      <div className="grid max-w-lg items-center gap-12 lg:max-w-6xl lg:grid-cols-2">
        <div>
          <h2 className="text-4xl font-bold leading-tight text-gray-900 dark:text-gray-100 lg:text-5xl">
            Forgot Your Password?
          </h2>
          <p className="mt-6 text-base leading-relaxed text-gray-600 dark:text-gray-400">
            Don&apos;t worry! Enter your email address and we&apos;ll send you a
            link to reset your password.
          </p>

          <div className="mt-6 text-sm text-gray-900 dark:text-gray-100 lg:mt-12">
            Remember your password?{" "}
            <Link
              href="/auth/login"
              className="ml-1 font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Back to sign in
            </Link>
          </div>
        </div>

        <div className="w-full max-w-md lg:ml-auto">
          <h1 className="mb-10 text-3xl font-bold text-gray-900 dark:text-gray-100">
            Reset password
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="mb-2 inline-block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="youremail@example.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              />
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                We&apos;ll send a reset link to this email address
              </p>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer rounded-md bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              Send reset link
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
