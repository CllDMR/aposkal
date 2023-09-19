"use client";

import type { FC } from "react";

import { Button, LinkButton } from "@acme/ui/molecules";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

interface ProductCardProps {
  initProduct: RouterOutputs["product"]["get"];
  id: NonNullable<RouterOutputs["product"]["get"]>["id"];
}

export const ProductCard: FC<ProductCardProps> = ({ initProduct, id }) => {
  const context = api.useContext();
  const [product] = api.product.get.useSuspenseQuery(
    { id },
    {
      initialData: initProduct,
    },
  );

  const { mutateAsync, isLoading } = api.product.delete.useMutation({
    async onSettled() {
      await context.product.list.invalidate();
      await context.product.get.invalidate();
    },
  });

  return (
    <div>
      <span>{product.name}</span>
      <LinkButton href={`/products/${product.id}/edit`}>Edit</LinkButton>
      <Button
        onClick={async () => await mutateAsync(product.id)}
        disabled={isLoading}
      >
        Delete
      </Button>
    </div>
  );
};
