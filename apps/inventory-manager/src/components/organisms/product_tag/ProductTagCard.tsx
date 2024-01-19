"use client";

import type { FC } from "react";

import { api } from "@acme/api-client";
import { ItemHeader } from "@acme/ui/molecules";

import type { RouterOutputs } from "~/utils/api";

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
      <ItemHeader
        disabled={isLoading}
        editHref={`/product-tags/${productTag.id}/edit`}
        onClickDelete={async () => void (await mutateAsync(productTag.id))}
        title={productTag.name}
      />
    </div>
  );
};
