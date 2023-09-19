"use client";

import type { FC } from "react";

import { Button, LinkButton } from "@acme/ui/molecules";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

interface ProductCategoryCardProps {
  initProductCategory: RouterOutputs["productCategory"]["get"];
  id: NonNullable<RouterOutputs["productCategory"]["get"]>["id"];
}

export const ProductCategoryCard: FC<ProductCategoryCardProps> = ({
  initProductCategory,
  id,
}) => {
  const context = api.useContext();
  const [productCategory] = api.productCategory.get.useSuspenseQuery(
    { id },
    {
      initialData: initProductCategory,
    },
  );

  const { mutateAsync, isLoading } = api.productCategory.delete.useMutation({
    async onSettled() {
      await context.productCategory.list.invalidate();
      await context.productCategory.get.invalidate();
    },
  });

  return (
    <div>
      <span>{productCategory.name}</span>
      <LinkButton href={`/product-categories/${productCategory.id}/edit`}>
        Edit
      </LinkButton>
      <Button
        onClick={async () => await mutateAsync(productCategory.id)}
        disabled={isLoading}
      >
        Delete
      </Button>
    </div>
  );
};
