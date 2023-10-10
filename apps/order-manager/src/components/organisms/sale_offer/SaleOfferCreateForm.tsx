"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { saleOfferCreateInput } from "@acme/api/src/inputs/sale_offer";
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
  customers: RouterOutputs["customer"]["list"];
}

export const SaleOfferCreateForm: FC<SaleOfferCreateFormProps> = ({
  customers: initialCustomers,
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
          <SaleOfferCreateInfoPanel customers={initialCustomers} />
          <SaleOfferCreateProductPanel />
          <SaleOfferCreateNotePanel />
          <SaleOfferCreatePreviewPanel />
        </TabPanel>
      </Form>
    </FormProvider>
  );
};
