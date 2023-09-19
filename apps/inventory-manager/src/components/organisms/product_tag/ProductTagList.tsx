"use client";

import type { FC } from "react";

import { Button, LinkButton } from "@acme/ui/molecules";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

interface ProductTagListProps {
  productTags: RouterOutputs["productTag"]["list"];
}

export const ProductTagList: FC<ProductTagListProps> = ({ productTags }) => {
  const context = api.useContext();
  const [data] = api.productTag.list.useSuspenseQuery(
    {},
    {
      initialData: productTags,
    },
  );

  const { mutateAsync, isLoading } = api.productTag.delete.useMutation({
    async onSettled() {
      await context.productTag.list.invalidate();
      await context.productTag.get.invalidate();
    },
  });

  return (
    <>
      {data.map((productTag) => (
        <div key={productTag.id}>
          <span>{productTag.name}</span>
          <LinkButton href={`/product-tags/${productTag.id}`}>Go</LinkButton>
          <LinkButton href={`/product-tags/${productTag.id}/edit`}>
            Edit
          </LinkButton>
          <Button
            onClick={async () => await mutateAsync(productTag.id)}
            disabled={isLoading}
          >
            Delete
          </Button>
        </div>
      ))}
    </>
  );
};
