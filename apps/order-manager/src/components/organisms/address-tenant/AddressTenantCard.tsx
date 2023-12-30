"use client";

import type { FC } from "react";

import { ItemHeader } from "@acme/ui/molecules";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

interface AddressTenantCardProps {
  initAddress: RouterOutputs["addressTenant"]["get"];
  id: NonNullable<RouterOutputs["addressTenant"]["get"]>["id"];
}

export const AddressTenantCard: FC<AddressTenantCardProps> = ({
  initAddress,
  id,
}) => {
  const utils = api.useUtils();
  const [address] = api.addressTenant.get.useSuspenseQuery(
    { id },
    {
      initialData: initAddress,
    },
  );

  const { mutateAsync, isLoading } = api.addressTenant.delete.useMutation({
    async onSettled() {
      await utils.addressTenant.list.invalidate();
      await utils.addressTenant.get.invalidate();
    },
  });

  return (
    <div>
      <ItemHeader
        disabled={isLoading}
        editHref={`/addresses/${address.id}/edit`}
        onClickDelete={async () => void (await mutateAsync(address.id))}
        title={address.name}
      />
    </div>
  );
};
