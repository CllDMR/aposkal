"use client";

import type { FC } from "react";

import { Button, LinkButton } from "@acme/ui/molecules";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

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
      <div>
        <span className="pr-4">{product.name}</span>
        <LinkButton href={`/products/${product.id}/edit`}>Edit</LinkButton>
        <Button
          onClick={async () => await mutateAsync(product.id)}
          disabled={isLoading}
        >
          Delete
        </Button>
      </div>
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
