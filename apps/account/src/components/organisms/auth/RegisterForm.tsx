import Image from "next/image";
import Link from "next/link";
import { AuthError } from "next-auth";

import { signIn } from "@acme/auth";
import { Card } from "@acme/ui/atoms";

import { getBaseUrl } from "~/utils/get-base-url";

export default function RegisterForm() {
  const baseUrl = getBaseUrl();

  return (
    <div className="grid min-h-screen min-w-full items-center justify-center">
      <Card>
        <Image
          className="mb-12 h-24"
          src="/logo.svg"
          alt="Aposkal Logo"
          width={286.3}
          height={141.73}
          priority
        />
        <form
          className="flex flex-col"
          action={async (formData) => {
            "use server";
            const { email, name, password } = JSON.parse(
              JSON.stringify(Object.fromEntries(formData)),
            ) as {
              email: string;
              name: string;
              password: string;
            };
            try {
              await signIn("credentials", {
                email,
                name,
                password,

                redirectTo: baseUrl + "/auth/verify-email-sent",
              });
            } catch (error) {
              // Handle auth errors
              if (error instanceof AuthError) throw error;
              throw error; // Rethrow all other errors
            }
          }}
        >
          <div className="flex flex-col">
            <div className="mb-3">
              <label
                className="mr-5 text-sm font-medium leading-6 text-gray-900"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="block w-full rounded-md border-0 p-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                type="email"
                name="email"
                id="email"
              />
            </div>

            <div className="my-3">
              <label
                className="mr-5 text-sm font-medium leading-6 text-gray-900"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="block w-full rounded-md border-0 p-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                type="text"
                autoComplete="given-name"
                name="name"
                id="name"
              />
            </div>

            <div className="mt-3">
              <label
                className="mr-5 text-sm font-medium leading-6 text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="block w-full rounded-md border-0 p-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                type="password"
                name="password"
                id="password"
              />
            </div>
          </div>

          <div className="my-4">
            <Link
              href={`/auth/login`}
              className="text-gray-500 hover:text-gray-900 hover:underline focus-visible:text-gray-900 focus-visible:underline"
            >
              <span className="text-sm font-light">
                Do you have an account? Login.
              </span>
            </Link>
          </div>

          <button className="inline-flex items-center justify-center rounded-md bg-primary-100 px-2.5 px-3 py-2 text-sm text-xs font-semibold text-primary-800 shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:bg-disabled-500 disabled:text-gray-400">
            Register
          </button>
        </form>
      </Card>
    </div>
  );
}
