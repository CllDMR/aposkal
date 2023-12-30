"use client";

import type { FC } from "react";

import { Button, LinkButton } from "@acme/ui/molecules";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

interface ProductTagCardProps {
  initProductTag: RouterOutputs["productTag"]["get"];
  id: NonNullable<RouterOutputs["productTag"]["get"]>["id"];
}

export const ProductTagCard: FC<ProductTagCardProps> = ({
  initProductTag,
  id,
}) => {
  const utils = api.useUtils();
  const [productTag] = api.productTag.get.useSuspenseQuery(
    { id },
    {
      initialData: initProductTag,
    },
  );

  const { mutateAsync, isLoading } = api.productTag.delete.useMutation({
    async onSettled() {
      await utils.productTag.list.invalidate();
      await utils.productTag.get.invalidate();
    },
  });

  return (
    <div>
      <span>{productTag.name}</span>
      <LinkButton href={`/product-tags/${productTag.id}/edit`}>Edit</LinkButton>
      <Button
        onClick={async () => await mutateAsync(productTag.id)}
        disabled={isLoading}
      >
        Delete
      </Button>
    </div>
  );
};
