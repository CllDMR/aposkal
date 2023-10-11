"use client";

import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@acme/ui/atoms";
import { Button, FormInput } from "@acme/ui/molecules";

interface LoginFormFields {
  email: string;
  password: string;
}

const loginInput = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default function LoginForm() {
  const searchParamsCallbackUrls =
    useSearchParams().getAll("callbackUrl") ?? [];

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormFields>({
    resolver: zodResolver(loginInput),
  });

  const onSubmit = handleSubmit(async (data) => {
    const params = new URLSearchParams();
    const combinedCallbackUrls = searchParamsCallbackUrls.reduce(
      (p, c) => p + c,
    );

    // params.append("callbackUrl", encodeURIComponent(s));
    params.append("callbackUrl", combinedCallbackUrls);

    await signIn("credentials-login", {
      ...data,
      callbackUrl: `/auth/select-tenant?${params.toString()}`,
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

      <Button type="submit" disabled={isSubmitting}>
        Login
      </Button>
    </Form>
  );
}
