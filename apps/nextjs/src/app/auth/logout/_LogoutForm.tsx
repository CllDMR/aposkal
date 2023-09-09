"use client";

import { signOut } from "next-auth/react";
import { useForm } from "react-hook-form";

import { Form } from "~/components/atoms/form/form";
import { Button } from "~/components/molecules/button";

export default function LogoutForm() {
  const {
    handleSubmit,
    formState: { isLoading },
  } = useForm();

  const onSubmit = handleSubmit(async () => {
    await signOut({
      callbackUrl: "/",
    });
  });

  return (
    <Form className="" onSubmit={onSubmit}>
      <Button type="submit" disabled={isLoading}>
        Logout
      </Button>
    </Form>
  );
}
