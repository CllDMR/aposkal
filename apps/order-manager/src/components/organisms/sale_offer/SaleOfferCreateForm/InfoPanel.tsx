"use client";

import type { FC } from "react";
import { useFormContext } from "react-hook-form";

import { FormSection } from "@acme/ui/atoms";
import {
  FormDateInput,
  FormDropdownInput,
  FormInput,
} from "@acme/ui/molecules";

import type { RouterInputs, RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

type SaleOfferCreateFormInfoPanelFields = RouterInputs["saleOffer"]["create"];

interface SaleOfferCreateFormInfoPanelProps {
  customers: RouterOutputs["customer"]["list"];
}

export const SaleOfferCreateInfoPanel: FC<
  SaleOfferCreateFormInfoPanelProps
> = ({ customers: initialCustomers }) => {
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
    register,
    formState: { errors },
    control,
  } = useFormContext<SaleOfferCreateFormInfoPanelFields>();

  return (
    <div className="divide-y">
      <FormSection
        label="Müşteri Bilgileri"
        description="Bir müşteri seçin veya yeni müşteri ekleyin."
      >
        <FormDropdownInput<SaleOfferCreateFormInfoPanelFields>
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
        <FormDateInput<SaleOfferCreateFormInfoPanelFields>
          id="startDate"
          label="Teklif Tarihi"
          name="startDate"
          control={control}
          errors={errors}
        />
        <FormDateInput<SaleOfferCreateFormInfoPanelFields>
          id="endDate"
          label="Geçerlilik Tarihi"
          name="endDate"
          control={control}
          errors={errors}
        />
        <FormInput<SaleOfferCreateFormInfoPanelFields>
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
        <FormDateInput<SaleOfferCreateFormInfoPanelFields>
          id="paymentEndDate"
          label="Ödeme Tarihi"
          name="paymentEndDate"
          control={control}
          errors={errors}
        />
        <FormInput<SaleOfferCreateFormInfoPanelFields>
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
        <FormDropdownInput<SaleOfferCreateFormInfoPanelFields>
          label="Proje"
          name="customerId"
          errors={errors}
          control={control}
          options={formattedCustomers}
        />
      </FormSection>
    </div>
  );
};
