"use client";

import type { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

import { Button, Form } from "@acme/ui";

interface SelectTenantProps {
  id: string;
  name: string;
}

export const SelectTenant: FC<SelectTenantProps> = ({ id, name }) => {
  const searchParamsCallbackUrl = useSearchParams().get("callbackUrl");
  const router = useRouter();

  const { data, update } = useSession();

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();

        await update({
          ...data,
          user: { ...data?.user, ti: id, tn: name },
        });

        router.push(searchParamsCallbackUrl ?? "/");
      }}
    >
      <Button type="submit">Select</Button>
    </Form>
  );
};
