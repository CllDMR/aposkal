"use client";

import type { FC } from "react";
import { useRouter } from "next/navigation";

import { useSession } from "@acme/auth";

interface SelectTenantProps {
  id: string;
  name: string;
}

export const SelectTenant: FC<SelectTenantProps> = ({ id, name }) => {
  const router = useRouter();

  const { data, update } = useSession();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        await update({
          ...data,
          user: { ...data?.user, ti: id, tn: name },
        });

        router.push("/");
      }}
    >
      <button type="submit">Select</button>
    </form>
  );
};
