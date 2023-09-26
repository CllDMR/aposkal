"use client";

import type { FC } from "react";

import { Button, LinkButton } from "@acme/ui/molecules";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

interface ProductCategoryListProps {
  productCategories: RouterOutputs["productCategory"]["list"];
}

export const ProductCategoryList: FC<ProductCategoryListProps> = ({
  productCategories,
}) => {
  const context = api.useContext();
  const [data] = api.productCategory.list.useSuspenseQuery(
    {},
    {
      initialData: productCategories,
    },
  );

  const { mutateAsync, isLoading } = api.productCategory.delete.useMutation({
    async onSettled() {
      await context.productCategory.list.invalidate();
      await context.productCategory.get.invalidate();
    },
  });

  return (
    <>
      {data.map((productCategory) => (
        <div key={productCategory.id}>
          <span>{productCategory.name}</span>
          <LinkButton href={`/product-categories/${productCategory.id}`}>
            Go
          </LinkButton>
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
      ))}
    </>
  );
};