"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import { useForm } from "react-hook-form";

import { Card, Form } from "@acme/ui/atoms";
import { Button } from "@acme/ui/molecules";

export default function LogoutForm() {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = handleSubmit(async () => {
    await signOut({
      callbackUrl: "/",
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

        <Form variant="none" className="" onSubmit={onSubmit}>
          <div className="mb-6">
            <span>You can logout securely now.</span>
          </div>
          <Button fullwidth type="submit" disabled={isSubmitting}>
            Logout
          </Button>
        </Form>
      </Card>
    </div>
  );
}
