"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { saleOfferCreateInput } from "@acme/api/src/inputs/sale_offer/sale_offer";
import { Form } from "@acme/ui/atoms";
import { TabPanel } from "@acme/ui/organisms";

import type { RouterInputs, RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";
import { SaleOfferCreateInfoPanel } from "./SaleOfferCreateForm/InfoPanel";
import { SaleOfferCreateNotePanel } from "./SaleOfferCreateForm/NotePanel";
import { SaleOfferCreatePreviewPanel } from "./SaleOfferCreateForm/PreviewPanel";
import { SaleOfferCreateProductPanel } from "./SaleOfferCreateForm/ProductPanel";

type SaleOfferCreateFormFields = RouterInputs["saleOffer"]["create"];

interface SaleOfferCreateFormProps {
  companies: RouterOutputs["company"]["list"];
  addresses: RouterOutputs["addressCompany"]["list"];
  tenant: RouterOutputs["tenant"]["getWithAddress"];
}

export const SaleOfferCreateForm: FC<SaleOfferCreateFormProps> = ({
  companies: initialCompanies,
  addresses: initialAddresses,
  tenant: initialTenant,
}) => {
  const context = api.useContext();
  const { mutateAsync } = api.saleOffer.create.useMutation({
    async onSettled() {
      await context.saleOffer.list.invalidate();
    },
  });

  const methods = useForm<SaleOfferCreateFormFields>({
    resolver: zodResolver(saleOfferCreateInput),
  });

  const onSubmit = methods.handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  return (
    <FormProvider {...methods}>
      <Form onSubmit={onSubmit} variant="none">
        <TabPanel
          labels={[
            "Teklif Bilgileri",
            "Ürün / Hizmetler",
            "Notlar",
            "Önizleme",
          ]}
          isSubmitting={methods.formState.isSubmitting}
        >
          <SaleOfferCreateInfoPanel companies={initialCompanies} />
          <SaleOfferCreateProductPanel />
          <SaleOfferCreateNotePanel />
          <SaleOfferCreatePreviewPanel
            companies={initialCompanies}
            addresses={initialAddresses}
            tenant={initialTenant}
          />
        </TabPanel>
      </Form>
    </FormProvider>
  );
};
