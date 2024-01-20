
import { loginAction } from "@acme/action";

export default function LoginForm() {
  return (
    <form
      className="flex flex-col"
      action={loginAction}
    >
      <div className="flex flex-col">
        <div className="mb-3">
          <label
            className="mr-5 text-sm font-medium leading-6 text-gray-900"
            htmlFor="email"
          >
            E-posta
          </label>
          <input
            className="block w-full rounded-md border-0 p-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
            type="email"
            name="email"
            id="email"
          />
        </div>

        <div className="mt-3">
          <label
            className="mr-5 text-sm font-medium leading-6 text-gray-900"
            htmlFor="password"
          >
            Parola
          </label>
          <input
            className="block w-full rounded-md border-0 p-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
            type="password"
            name="password"
            id="password"
          />
        </div>
      </div>

      <button className="mt-4 inline-flex items-center justify-center rounded-md bg-primary-100 px-3 py-2 text-xs font-semibold text-primary-800 shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:bg-disabled-500 disabled:text-gray-400">
        Giriş Yap
      </button>
    </form>
  );
}
