"use client";

import type { FC } from "react";

import { Button, LinkButton } from "@acme/ui/molecules";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

interface SupplierCardProps {
  initSupplier: RouterOutputs["supplier"]["get"];
  id: NonNullable<RouterOutputs["supplier"]["get"]>["id"];
}

export const SupplierCard: FC<SupplierCardProps> = ({ initSupplier, id }) => {
  const context = api.useContext();
  const [supplier] = api.supplier.get.useSuspenseQuery(
    { id },
    {
      initialData: initSupplier,
    },
  );

  const { mutateAsync, isLoading } = api.supplier.delete.useMutation({
    async onSettled() {
      await context.supplier.list.invalidate();
      await context.supplier.get.invalidate();
    },
  });

  return (
    <div>
      <span>{supplier.title}</span>
      <LinkButton href={`/suppliers/${supplier.id}/edit`}>Edit</LinkButton>
      <Button
        onClick={async () => await mutateAsync(supplier.id)}
        disabled={isLoading}
      >
        Delete
      </Button>
    </div>
  );
};
