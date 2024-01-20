"use client";

import type { FC } from "react";

import type { RouterOutputs } from "@acme/api";
import { api } from "@acme/api-client";
import { ItemHeader } from "@acme/ui/molecules";

interface AddressCompanyCardProps {
  initAddress: RouterOutputs["addressCompany"]["get"];
  id: NonNullable<RouterOutputs["addressCompany"]["get"]>["id"];
}

export const AddressCompanyCard: FC<AddressCompanyCardProps> = ({
  initAddress,
  id,
}) => {
  const utils = api.useUtils();
  const [address] = api.addressCompany.get.useSuspenseQuery(
    { id },
    {
      initialData: initAddress,
    },
  );

  const { mutateAsync, isLoading } = api.addressCompany.delete.useMutation({
    async onSettled() {
      await utils.addressCompany.list.invalidate();
      await utils.addressCompany.get.invalidate();
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
