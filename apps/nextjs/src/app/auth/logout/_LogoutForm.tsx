"use client";

import { useForm } from "react-hook-form";

import { signOut } from "@acme/auth";

import { Form } from "~/components/atoms/form/form";

export default function LogoutForm() {
  const { handleSubmit } = useForm();

  const onSubmit = handleSubmit(async () => {
    await signOut({
      callbackUrl: "/",
    });
  });

  return (
    <Form className="" onSubmit={onSubmit}>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Logout
      </button>
    </Form>
  );
}
