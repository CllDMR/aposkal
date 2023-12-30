"use client";

import type { FC } from "react";

import { Button, LinkButton } from "@acme/ui/molecules";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

interface SupplierCardProps {
  supplier: RouterOutputs["supplier"]["get"];
  id: NonNullable<RouterOutputs["supplier"]["get"]>["id"];
}

export const SupplierCard: FC<SupplierCardProps> = ({
  supplier: initialSupplier,
  id,
}) => {
  const utils = api.useUtils();
  const [supplier] = api.supplier.get.useSuspenseQuery(
    { id },
    {
      initialData: initialSupplier,
    },
  );

  const { mutateAsync, isLoading } = api.supplier.delete.useMutation({
    async onSettled() {
      await utils.supplier.list.invalidate();
      await utils.supplier.get.invalidate();
    },
  });

  return (
    <div className="">
      <div>
        <span className="pr-4">{supplier.name}</span>
        <LinkButton href={`/suppliers/${supplier.id}/edit`}>Edit</LinkButton>
        <Button
          onClick={async () => await mutateAsync(supplier.id)}
          disabled={isLoading}
        >
          Delete
        </Button>
      </div>
      <div>
        {supplier.productsToSuppliers.map((productsToSupplier) => (
          <p key={productsToSupplier.productId} className="">
            {productsToSupplier.product.name}
          </p>
        ))}
      </div>
    </div>
  );
};
