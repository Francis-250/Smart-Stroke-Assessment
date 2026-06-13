"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) toast.error(error.message);

    if (data) {
      router.push("/auth/callback");
    }
  };

  const handleGoogle = async () => {
    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/auth/callback",
      });

      if (error) {
        toast.error(error?.message || "Failed to sign in with Google");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-4 md:px-8">
      <div className="grid max-w-lg items-center gap-12 lg:max-w-6xl lg:grid-cols-2">
        {/* Left Side - Hero Section */}
        <div>
          <h2 className="text-4xl font-bold leading-tight text-slate-900 dark:text-slate-50 lg:text-5xl">
            Seamless Login for Exclusive Access
          </h2>
          <p className="mt-6 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Immerse yourself in a hassle-free login journey with our intuitively
            designed login form. Effortlessly access your account.
          </p>

          <div className="mt-6 text-sm text-slate-900 dark:text-slate-50 lg:mt-12">
            Don&apos;t have an account{" "}
            <Link
              href="/auth/register"
              className="ml-1 font-medium text-blue-700 hover:underline dark:text-blue-500"
            >
              Register here
            </Link>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md lg:ml-auto">
          <h1 className="mb-10 text-3xl font-bold text-slate-900 dark:text-slate-50">
            Sign in
          </h1>

          <form className="space-y-6" onSubmit={handleSignIn}>
            <div>
              <label
                htmlFor="email"
                className="mb-2 inline-block text-sm font-medium text-slate-900 dark:text-slate-50"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full rounded-md bg-white px-3 py-2.5 text-sm text-slate-900 outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:bg-neutral-800 dark:text-slate-50 dark:outline-neutral-700"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 inline-block text-sm font-medium text-slate-900 dark:text-slate-50"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full rounded-md bg-white px-3 py-2.5 text-sm text-slate-900 outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:bg-neutral-800 dark:text-slate-50 dark:outline-neutral-700"
              />
            </div>

            <div className="flex flex-wrap items-start gap-2">
              <label className="group flex items-center has-checked:text-slate-900">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="sr-only"
                  onChange={(e) => setRememberMe(e.target.checked)}
                  checked={rememberMe}
                />
                <span
                  className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-white outline-1 outline-slate-300 group-focus-within:outline-2 group-focus-within:outline-blue-600 group-has-checked:bg-blue-600 group-has-checked:outline-blue-600 dark:bg-neutral-800 dark:outline-neutral-700"
                  aria-hidden="true"
                >
                  <svg
                    className="size-3 text-white opacity-0 group-has-checked:opacity-100"
                    viewBox="0 0 12 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M1 5l3 3 7-7" />
                  </svg>
                </span>
                <span className="ml-3 text-sm text-slate-700 dark:text-slate-300">
                  Remember me
                </span>
              </label>

              <Link
                href="/auth/forgot-password"
                className="ml-auto rounded text-sm font-medium text-blue-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-500"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer rounded-md border border-blue-600 bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Sign in
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <hr className="w-full border-slate-300 dark:border-neutral-700" />
            <p className="text-center text-sm text-slate-700 dark:text-slate-300">
              or
            </p>
            <hr className="w-full border-slate-300 dark:border-neutral-700" />
          </div>

          <div>
            <button
              onClick={handleGoogle}
              className="flex w-full items-center justify-center gap-2.5 rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-slate-50 dark:hover:bg-neutral-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4.5"
                viewBox="0 0 512 512"
                aria-hidden="true"
              >
                <path
                  fill="#fbbd00"
                  d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                />
                <path
                  fill="#0f9d58"
                  d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                />
                <path
                  fill="#31aa52"
                  d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                />
                <path
                  fill="#3c79e6"
                  d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                />
                <path
                  fill="#cf2d48"
                  d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                />
                <path
                  fill="#eb4132"
                  d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                />
              </svg>
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
