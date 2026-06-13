import React from "react";
import Link from "next/link";

export default function Register() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-4 md:px-8">
      <div className="grid max-w-lg items-center gap-12 lg:max-w-6xl lg:grid-cols-2">
        <div>
          <h2 className="text-4xl font-bold leading-tight text-gray-900 dark:text-gray-100 lg:text-5xl">
            Join Our Community Today
          </h2>
          <p className="mt-6 text-base leading-relaxed text-gray-600 dark:text-gray-400">
            Create your account and unlock exclusive features. Get started in
            minutes with our simple registration process.
          </p>

          <div className="mt-6 text-sm text-gray-900 dark:text-gray-100 lg:mt-12">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="ml-1 font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Sign in here
            </Link>
          </div>
        </div>

        <div className="w-full max-w-md lg:ml-auto">
          <h1 className="mb-10 text-3xl font-bold text-gray-900 dark:text-gray-100">
            Create account
          </h1>

          <form className="space-y-6">
            <div>
              <label
                htmlFor="fullname"
                className="mb-2 inline-block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Full name
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                placeholder="John Doe"
                required
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 inline-block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="john@readymadeui.com"
                required
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 inline-block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                required
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 inline-block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Confirm password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="••••••••"
                required
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              />
            </div>

            <div className="flex items-start gap-2">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="mt-0.5 h-4 w-4 rounded border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900"
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                I agree to the{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  Terms & Conditions
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer rounded-md bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              Register
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
            <button className="flex w-full items-center justify-center gap-2.5 rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              Sign up with Google
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
