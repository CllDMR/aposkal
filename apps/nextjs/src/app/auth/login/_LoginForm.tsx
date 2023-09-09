"use client";

import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "~/components/atoms/form/form";
import { Button } from "~/components/molecules/button";
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
  const searchParamsCallbackUrl = useSearchParams().get("callbackUrl");

  const {
    handleSubmit,
    register,
    formState: { errors, isLoading },
  } = useForm<LoginFormFields>({
    resolver: zodResolver(loginInput),
  });

  const onSubmit = handleSubmit(async (data) => {
    await signIn("credentials-login", {
      ...data,
      callbackUrl: `/auth/select-tenant${
        searchParamsCallbackUrl
          ? "?callbackUrl=" + encodeURIComponent(searchParamsCallbackUrl)
          : ""
      }`,
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

      <Button type="submit" disabled={isLoading}>
        Login
      </Button>
    </Form>
  );
}
