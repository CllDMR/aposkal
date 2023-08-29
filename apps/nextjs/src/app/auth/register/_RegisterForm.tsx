"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { signIn } from "@acme/auth";

import { Form } from "~/components/atoms/form/form";
import { FormInput } from "~/components/molecules/form/form-input";

interface RegisterFormFields {
  email: string;
  name: string;
  password: string;
}

const registerInput = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
});

export default function RegisterForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormFields>({
    resolver: zodResolver(registerInput),
  });

  const onSubmit = handleSubmit(async (data) => {
    await signIn("credentials-register", {
      ...data,
      callbackUrl: "/auth/verify-email-sent",
    });
  });

  return (
    <Form className="" onSubmit={onSubmit}>
      <FormInput<RegisterFormFields>
        id="email"
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        errors={errors}
        register={register}
      />

      <FormInput<RegisterFormFields>
        id="name"
        label="Name"
        name="name"
        type="text"
        autoComplete="name"
        errors={errors}
        register={register}
      />

      <FormInput<RegisterFormFields>
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
        Register
      </button>
    </Form>
  );
}
