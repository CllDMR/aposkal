"use client";

import { useCallback, useEffect } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import { registerAction } from "~/actions/register";

export const RegisterForm = () => {
  // const searchParams = useSearchParams();
  // const searchParamsError = searchParams.get("error");
  // let errors = {};
  // if (searchParamsError) errors = { [searchParamsError]: "Error Message" };

  const { executeRecaptcha } = useGoogleReCaptcha();

  // Create an event handler so you can call the verification on button click event or form submit
  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }

    return await executeRecaptcha();
    // Do whatever you want with the token
  }, [executeRecaptcha]);

  // You can use useEffect to trigger the verification as soon as the component being loaded
  useEffect(() => {
    void handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  return (
    <form
      className="flex animate-fadein flex-col"
      action={async (formData: FormData) => {
        const token = await handleReCaptchaVerify();

        if (!token) {
          console.log("no token");
          return;
        }

        formData.append("gRecaptchaToken", token);

        await registerAction(formData);
      }}
    >
      <div className="mb-6 mt-10 flex flex-col gap-y-4">
        <div className="">
          <label
            className="mb-3 block text-sm font-medium text-gray-700"
            htmlFor="name"
          >
            Ad Soyad
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-base text-gray-900 placeholder-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
            autoComplete="name"
          />
        </div>

        <div className="">
          <label
            className="mb-3 block text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            E-posta
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-base text-gray-900 placeholder-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
            autoComplete="email"
          />
        </div>

        <div className="">
          <label
            className="mb-3 block text-sm font-medium text-gray-700"
            htmlFor="phone"
          >
            Cep Telefonu
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-base text-gray-900 placeholder-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
            autoComplete="tel"
          />
        </div>

        <div className="">
          <label
            className="mb-3 block text-sm font-medium text-gray-700"
            htmlFor="password"
          >
            Parola
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-base text-gray-900 placeholder-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
            autoComplete="new-password"
          />
        </div>
        {/* <pre>{errors ? JSON.stringify(errors, null, 4) : null}</pre> */}
      </div>

      <button className="group inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 hover:text-slate-100 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:bg-blue-800 active:text-blue-100 disabled:opacity-50">
        Kayıt Ol
      </button>
    </form>
  );
};
