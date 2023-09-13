"use client";

import type { FC } from "react";

import { Button, LinkButton } from "@acme/ui/molecules";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

interface ProductListProps {
  products: RouterOutputs["product"]["list"];
}

export const ProductList: FC<ProductListProps> = ({ products }) => {
  const context = api.useContext();
  const [data] = api.product.list.useSuspenseQuery(
    {},
    {
      initialData: products,
    },
  );

  const { mutateAsync, isLoading } = api.product.delete.useMutation({
    async onSettled() {
      await context.product.list.invalidate();
      await context.product.get.invalidate();
    },
  });

  return (
    <>
      {data.map((product) => (
        <div key={product.id}>
          <span>{product.title}</span>
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
