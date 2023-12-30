"use client";

import type { FC } from "react";

import { Button, LinkButton } from "@acme/ui/molecules";

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
      <span>{address.name}</span>
      <LinkButton href={`/addresses/${address.id}/edit`}>Edit</LinkButton>
      <Button
        onClick={async () => await mutateAsync(address.id)}
        disabled={isLoading}
      >
        Delete
      </Button>
    </div>
  );
};
