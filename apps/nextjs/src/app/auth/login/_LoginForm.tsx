"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { signIn } from "@acme/auth";

import { Form } from "~/components/atoms/form/form";
import { FormInput } from "~/components/molecules/form/form-input";

interface LoginFormFields {
  email: string;
  password: string;
}

const loginInput = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default function LoginForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormFields>({
    resolver: zodResolver(loginInput),
  });

  const onSubmit = handleSubmit(async (data) => {
    await signIn("credentials-login", {
      ...data,
      callbackUrl: "/auth/select-tenant",
    });
  });

  return (
    <Form className="" onSubmit={onSubmit}>
      <FormInput<LoginFormFields>
        id="email"
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        errors={errors}
        register={register}
      />

      <FormInput<LoginFormFields>
        id="password"
        label="Password"
        name="password"
        type="password"
        autoComplete="password"
        errors={errors}
        register={register}
      />

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Login
      </button>
    </Form>
  );
}
