"use client";

import type { FC } from "react";

import { Button, LinkButton } from "@acme/ui/molecules";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

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
      <span>{company.title}</span>
      <LinkButton href={`/companies/${company.id}/edit`}>Edit</LinkButton>
      <Button
        onClick={async () => await mutateAsync(company.id)}
        disabled={isLoading}
      >
        Delete
      </Button>
    </div>
  );
};
