"use client";

import type { FC } from "react";

import type { RouterOutputs } from "@acme/api";
import { api } from "@acme/api-client";
import { ItemHeader } from "@acme/ui/molecules";

interface ProductCategoryCardProps {
  initProductCategory: RouterOutputs["productCategory"]["get"];
  id: NonNullable<RouterOutputs["productCategory"]["get"]>["id"];
}

export const ProductCategoryCard: FC<ProductCategoryCardProps> = ({
  initProductCategory,
  id,
}) => {
  const utils = api.useUtils();
  const [productCategory] = api.productCategory.get.useSuspenseQuery(
    { id },
    {
      initialData: initProductCategory,
    },
  );

  const { mutateAsync, isLoading } = api.productCategory.delete.useMutation({
    async onSettled() {
      await utils.productCategory.list.invalidate();
      await utils.productCategory.get.invalidate();
    },
  });

  return (
    <div>
      <ItemHeader
        disabled={isLoading}
        editHref={`/product-categories/${productCategory.id}/edit`}
        onClickDelete={async () => void (await mutateAsync(productCategory.id))}
        title={productCategory.name}
      />
    </div>
  );
};
