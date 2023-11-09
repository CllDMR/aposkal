"use client";

import type { FC } from "react";

import { Button, LinkButton } from "@acme/ui/molecules";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

interface AddressCompanyCardProps {
  initAddress: RouterOutputs["addressCompany"]["get"];
  id: NonNullable<RouterOutputs["addressCompany"]["get"]>["id"];
}

export const AddressCompanyCard: FC<AddressCompanyCardProps> = ({
  initAddress,
  id,
}) => {
  const context = api.useContext();
  const [address] = api.addressCompany.get.useSuspenseQuery(
    { id },
    {
      initialData: initAddress,
    },
  );

  const { mutateAsync, isLoading } = api.addressCompany.delete.useMutation({
    async onSettled() {
      await context.addressCompany.list.invalidate();
      await context.addressCompany.get.invalidate();
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
