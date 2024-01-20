"use client";

import type { FC } from "react";

import type { RouterOutputs } from "@acme/api";
import { api } from "@acme/api-client";
import { ItemHeader } from "@acme/ui/molecules";

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
      <ItemHeader
        disabled={isLoading}
        editHref={`/suppliers/${supplier.id}/edit`}
        onClickDelete={async () => void (await mutateAsync(supplier.id))}
        title={supplier.name}
      />

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
