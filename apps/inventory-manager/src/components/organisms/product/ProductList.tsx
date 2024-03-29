"use client";

import type { FC } from "react";

import type { RouterOutputs } from "@acme/api";
import { api } from "@acme/api-client";
import { Button, LinkButton } from "@acme/ui/molecules";

interface ProductListProps {
  products: RouterOutputs["product"]["list"];
}

export const ProductList: FC<ProductListProps> = ({ products }) => {
  const utils = api.useUtils();
  const [result] = api.product.list.useSuspenseQuery(
    {},
    {
      initialData: products,
    },
  );

  const { mutateAsync, isLoading } = api.product.delete.useMutation({
    async onSettled() {
      await utils.product.list.invalidate();
      await utils.product.get.invalidate();
    },
  });

  return (
    <>
      {result.products.map((product) => (
        <div key={product.id}>
          <span>{product.name}</span>
          <LinkButton href={`/products/${product.id}`}>Go</LinkButton>
          <LinkButton href={`/products/${product.id}/edit`}>Edit</LinkButton>
          <Button
            onClick={async () => await mutateAsync(product.id)}
            disabled={isLoading}
          >
            Delete
          </Button>
        </div>
      ))}
    </>
  );
};
