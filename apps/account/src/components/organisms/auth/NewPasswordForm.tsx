import type { FC } from "react";

import { changePasswordStartAction } from "@acme/action";

interface NewPasswordFormProps {
  email: string;
}

export const NewPasswordForm: FC<NewPasswordFormProps> = ({ email }) => {
  return (
    <form
      className="flex animate-fadein flex-col"
      action={changePasswordStartAction}
    >
      <div className="mb-6 mt-10 flex flex-col gap-y-4">
        <div className="">
          <label
            className="mb-3 block text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="text"
            className="focus:border-blue-500 focus:ring-blue-500 block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-base text-gray-900 placeholder-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            autoComplete="email"
            defaultValue={email}
          />
        </div>

        {/* <pre>{errors ? JSON.stringify(errors, null, 4) : null}</pre> */}
      </div>

      <button className="bg-blue-600 hover:bg-blue-500 hover:text-slate-100 focus-visible:outline-blue-600 active:bg-blue-800 active:text-blue-100 group inline-flex w-full items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50">
        E-Posta Yolla
      </button>
    </form>
  );
};
