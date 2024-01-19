"use client";

import type { FC } from "react";

import { api } from "@acme/api-client";
import { ItemHeader } from "@acme/ui/molecules";

import type { RouterOutputs } from "~/utils/api";

interface CompanyCardProps {
  initCompany: RouterOutputs["company"]["get"];
  id: NonNullable<RouterOutputs["company"]["get"]>["id"];
}

export const CompanyCard: FC<CompanyCardProps> = ({ initCompany, id }) => {
  const utils = api.useUtils();
  const [company] = api.company.get.useSuspenseQuery(
    { id },
    {
      initialData: initCompany,
    },
  );

  const { mutateAsync, isLoading } = api.company.delete.useMutation({
    async onSettled() {
      await utils.company.list.invalidate();
      await utils.company.get.invalidate();
    },
  });

  return (
    <div>
      <ItemHeader
        disabled={isLoading}
        editHref={`/companies/${company.id}/edit`}
        onClickDelete={async () => void (await mutateAsync(company.id))}
        title={company.title}
      />
    </div>
  );
};
