"use client";

import type { FC } from "react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

import type { RouterInputs, RouterOutputs } from "@acme/api";
import { Button } from "@acme/ui/molecules";

import { api } from "~/utils/api";
import { useSaleOfferPDFTemplateFromFormValues } from "~/utils/useSaleOfferPDFTemplate";

type SaleOfferCreateFormFields = RouterInputs["saleOffer"]["create"];

interface SaleOfferCreatePreviewPanelProps {
  companies: RouterOutputs["company"]["list"]["companies"];
  addresses: RouterOutputs["addressCompany"]["list"]["addressCompanies"];
  tenant: RouterOutputs["tenant"]["getWithAddress"];
}

export const SaleOfferCreatePreviewPanel: FC<
  SaleOfferCreatePreviewPanelProps
> = ({
  companies: initialCompanies,
  addresses: initialAddresses,
  tenant: initialTenant,
}) => {
  const [formValues, setFormValues] =
    useState<Partial<SaleOfferCreateFormFields> | null>(null);

  const { getValues } = useFormContext<SaleOfferCreateFormFields>();

  const { data: company } = api.company.get.useQuery(
    {
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      id: formValues?.companyId!,
    },
    {
      initialData: initialCompanies.find((o) => o.id === formValues?.companyId),
      enabled:
        Boolean(formValues?.companyId) &&
        typeof formValues?.companyId === "string",
    },
  );

  const { data: address } = api.addressCompany.get.useQuery(
    {
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      id: formValues?.addressId!,
    },
    {
      initialData: initialAddresses.find((o) => o.id === formValues?.addressId),
      enabled:
        Boolean(formValues?.addressId) &&
        typeof formValues?.addressId === "string",
    },
  );

  const { data: tenant } = api.tenant.getWithAddress.useQuery(undefined, {
    initialData: initialTenant,
  });

  const { pdfData } = useSaleOfferPDFTemplateFromFormValues({
    address,
    company,
    tenant,
    formValues,
  });

  return (
    <div className="">
      <div className="border-b pb-8">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Önizleme
        </h3>
      </div>
      <div className="">
        <Button type="button" onClick={() => setFormValues(getValues())}>
          Refresh
        </Button>
      </div>

      <div className="">
        {pdfData ? (
          <iframe
            title="PDF Viewer"
            src={`data:application/pdf;base64,${pdfData}`}
            className="h-screen sm:w-full"
          ></iframe>
        ) : (
          <span className="">No pdf data</span>
        )}
      </div>
    </div>
  );
};
