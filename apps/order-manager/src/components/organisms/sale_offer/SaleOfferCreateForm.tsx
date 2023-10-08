"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { saleOfferCreateInput } from "@acme/api/src/inputs/sale_offer";
import { Form, FormSection } from "@acme/ui/atoms";
import {
  FormDateInput,
  FormDropdownInput,
  FormInput,
} from "@acme/ui/molecules";
import { TabPanel } from "@acme/ui/organisms";

import type { RouterInputs, RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

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

  const { data: customers } = api.customer.list.useQuery(
    {},
    {
      initialData: initialCustomers,
    },
  );

  const formattedCustomers =
    customers?.map((customer) => ({
      id: customer.id,
      label: `${customer.firstname} ${customer.middlename} ${customer.lastname}`,
      value: customer.id,
    })) ?? [];

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
  } = useForm<SaleOfferCreateFormFields>({
    resolver: zodResolver(saleOfferCreateInput),
  });

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  return (
    <Form onSubmit={onSubmit} variant="none">
      <TabPanel
        labels={["Teklif Bilgileri", "Ürün / Hizmetler", "Notlar", "Önizleme"]}
        isSubmitting={isSubmitting}
      >
        <div className="divide-y">
          <FormSection
            label="Müşteri Bilgileri"
            description="Bir müşteri seçin veya yeni müşteri ekleyin."
          >
            <FormDropdownInput<SaleOfferCreateFormFields>
              label="Müşteri"
              name="customerId"
              errors={errors}
              control={control}
              options={formattedCustomers}
            />
          </FormSection>

          <FormSection
            label="Teklif Bilgileri"
            description="Teklif tarihini giriniz. Teklif numarası otomatik olarak oluşturulacaktır."
          >
            <FormDateInput<SaleOfferCreateFormFields>
              id="startDate"
              label="Teklif Tarihi"
              name="startDate"
              control={control}
              errors={errors}
            />
            <FormDateInput<SaleOfferCreateFormFields>
              id="endDate"
              label="Geçerlilik Tarihi"
              name="endDate"
              control={control}
              errors={errors}
            />
            <FormInput<SaleOfferCreateFormFields>
              id="no"
              label="No"
              name="no"
              type="text"
              errors={errors}
              register={register}
            />
          </FormSection>

          <FormSection
            label="Ödeme Bilgileri"
            description="Ödeme vadesi ve varsa döviz cinsini giriniz."
          >
            <FormDateInput<SaleOfferCreateFormFields>
              id="paymentEndDate"
              label="Ödeme Tarihi"
              name="paymentEndDate"
              control={control}
              errors={errors}
            />
            <FormInput<SaleOfferCreateFormFields>
              id="currency"
              label="Döviz Cinsi"
              name="currency"
              type="text"
              errors={errors}
              register={register}
            />
          </FormSection>

          <FormSection
            label="Proje Bilgileri"
            description="Maliyet ve karlılığı proje bazında takip etmek istiyorsanız bir proje seçin veya ekleyin. Zorunlu değildir."
          >
            <FormDropdownInput<SaleOfferCreateFormFields>
              label="Proje"
              name="customerId"
              errors={errors}
              control={control}
              options={formattedCustomers}
            />
          </FormSection>
        </div>
        <div className="">Panel 2</div>
        <div className="">Panel 3</div>
        <div className="">Panel 4</div>
      </TabPanel>
    </Form>
  );
};
