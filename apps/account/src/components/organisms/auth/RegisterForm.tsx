"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Card, Form } from "@acme/ui/atoms";
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
  const searchParamsCallbackUrls =
    useSearchParams().getAll("callbackUrl") ?? [];
  const params = new URLSearchParams();
  const combinedCallbackUrls = searchParamsCallbackUrls.reduce(
    (p, c) => p + c,
    "",
  );
  params.append("callbackUrl", combinedCallbackUrls);

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
    <div className="grid min-h-screen min-w-full items-center justify-center">
      <Card>
        <Image
          className="mb-12 h-24"
          src="/logo.svg"
          alt="Aposkal Logo"
          width={286.3}
          height={141.73}
        />

        <Form
          variant="none"
          className="flex flex-col space-y-3"
          onSubmit={onSubmit}
        >
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

          <div className="mt-4">
            <Link
              href={`/auth/login?${params.toString()}`}
              className="text-gray-500 hover:text-gray-900 hover:underline focus-visible:text-gray-900 focus-visible:underline"
            >
              <span className="text-sm font-light">
                Do you have an account? Login.
              </span>
            </Link>
          </div>

          <div className="mt-4 flex w-full justify-end">
            <Button type="submit" disabled={isSubmitting}>
              Register
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
