"use client";

import type { FC } from "react";

import { api } from "@acme/api-client";
import { Button, LinkButton } from "@acme/ui/molecules";

import type { RouterOutputs } from "~/utils/api";

interface SupplierListProps {
  suppliers: RouterOutputs["supplier"]["list"];
}

export const SupplierList: FC<SupplierListProps> = ({ suppliers }) => {
  const utils = api.useUtils();
  const [result] = api.supplier.list.useSuspenseQuery(
    {},
    {
      initialData: suppliers,
    },
  );

  const { mutateAsync, isLoading } = api.supplier.delete.useMutation({
    async onSettled() {
      await utils.supplier.list.invalidate();
      await utils.supplier.get.invalidate();
    },
  });

  return (
    <>
      {result.suppliers.map((supplier) => (
        <div key={supplier.id}>
          <span>{supplier.name}</span>
          <LinkButton href={`/suppliers/${supplier.id}`}>Go</LinkButton>
          <LinkButton href={`/suppliers/${supplier.id}/edit`}>Edit</LinkButton>
          <Button
            onClick={async () => await mutateAsync(supplier.id)}
            disabled={isLoading}
          >
            Delete
          </Button>
        </div>
      ))}
    </>
  );
};
