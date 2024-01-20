"use client";

import type { FC } from "react";

import type { RouterOutputs } from "@acme/api";
import { api } from "@acme/api-client";
import { Button, LinkButton } from "@acme/ui/molecules";

interface ProductTagListProps {
  productTags: RouterOutputs["productTag"]["list"];
}

export const ProductTagList: FC<ProductTagListProps> = ({ productTags }) => {
  const utils = api.useUtils();
  const [result] = api.productTag.list.useSuspenseQuery(
    {},
    {
      initialData: productTags,
    },
  );

  const { mutateAsync, isLoading } = api.productTag.delete.useMutation({
    async onSettled() {
      await utils.productTag.list.invalidate();
      await utils.productTag.get.invalidate();
    },
  });

  return (
    <>
      {result.productTags.map((productTag) => (
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
