"use client";

import type { FC } from "react";

import type { RouterOutputs } from "@acme/api";
import { api } from "@acme/api-client";
import { ItemHeader } from "@acme/ui/molecules";

interface ProductCardProps {
  product: RouterOutputs["product"]["get"];
  id: NonNullable<RouterOutputs["product"]["get"]>["id"];
}

export const ProductCard: FC<ProductCardProps> = ({
  product: initialProduct,
  id,
}) => {
  const utils = api.useUtils();
  const [product] = api.product.get.useSuspenseQuery(
    { id },
    {
      initialData: initialProduct,
    },
  );

  const { mutateAsync, isLoading } = api.product.delete.useMutation({
    async onSettled() {
      await utils.product.list.invalidate();
      await utils.product.get.invalidate();
    },
  });

  return (
    <div className="">
      <ItemHeader
        disabled={isLoading}
        editHref={`/products/${product.id}/edit`}
        onClickDelete={async () => void (await mutateAsync(product.id))}
        title={product.name}
      />

      <div>
        {product.productsToCategories.map((productsToCategory) => (
          <p key={productsToCategory.product_categoryId} className="">
            {productsToCategory.productCategory.name}
          </p>
        ))}
      </div>
      <div>
        {product.productsToTags.map((productsToTag) => (
          <p key={productsToTag.product_tagId} className="">
            {productsToTag.productTag.name}
          </p>
        ))}
      </div>
    </div>
  );
};
