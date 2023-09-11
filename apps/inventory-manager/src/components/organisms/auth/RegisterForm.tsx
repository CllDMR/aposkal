"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@acme/ui/atoms";
import { Button, FormInput } from "@acme/ui/molecules";

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
    formState: { errors, isSubmitting },
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

      <Button type="submit" disabled={isSubmitting}>
        Register
      </Button>
    </Form>
  );
}
