"use client";

import type { FC } from "react";

import { Button, LinkButton } from "@acme/ui/molecules";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

interface AddressCardProps {
  initAddress: RouterOutputs["address"]["get"];
  id: NonNullable<RouterOutputs["address"]["get"]>["id"];
}

export const AddressCard: FC<AddressCardProps> = ({ initAddress, id }) => {
  const context = api.useContext();
  const [address] = api.address.get.useSuspenseQuery(
    { id },
    {
      initialData: initAddress,
    },
  );

  const { mutateAsync, isLoading } = api.address.delete.useMutation({
    async onSettled() {
      await context.address.list.invalidate();
      await context.address.get.invalidate();
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
