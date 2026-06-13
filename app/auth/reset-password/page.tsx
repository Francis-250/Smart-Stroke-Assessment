"use client";
import React, { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useSearchParams } from "next/navigation";
import { it } from "node:test";
import { toast } from "sonner";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    const { error } = await authClient.resetPassword({
      newPassword: password,
      token,
    });

    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-4 md:px-8">
      <div className="grid max-w-lg items-center gap-12 lg:max-w-6xl lg:grid-cols-2">
        <div>
          <h2 className="text-4xl font-bold leading-tight text-gray-900 dark:text-gray-100 lg:text-5xl">
            Create New Password
          </h2>
          <p className="mt-6 text-base leading-relaxed text-gray-600 dark:text-gray-400">
            Your new password must be different from your previously used
            passwords and should be at least 8 characters long.
          </p>

          <div className="mt-6 text-sm text-gray-900 dark:text-gray-100 lg:mt-12">
            <Link
              href="/auth/login"
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              ← Back to sign in
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
                htmlFor="password"
                className="mb-2 inline-block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                New password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 pr-10 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Password must be at least 8 characters
              </p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 inline-block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Confirm new password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="••••••••"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 pr-10 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400"
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-950/30">
              <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                Password requirements:
              </p>
              <ul className="mt-2 list-inside list-disc text-xs text-blue-700 dark:text-blue-400">
                <li>At least 8 characters long</li>
                <li>Contains uppercase and lowercase letters</li>
                <li>Contains at least one number</li>
                <li>Contains at least one special character</li>
              </ul>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer rounded-md bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              Reset password
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
