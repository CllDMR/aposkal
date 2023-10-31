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
  addresses: RouterOutputs["address"]["list"];
}

export const SaleOfferCreateInfoPanel: FC<
  SaleOfferCreateFormInfoPanelProps
> = ({ customers: initialCustomers, addresses: initialAddresses }) => {
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

  const { data: addresses } = api.address.list.useQuery(
    {},
    {
      initialData: initialAddresses,
    },
  );

  const formattedAddresses =
    addresses?.map((address) => ({
      id: address.id,
      label: address.name,
      value: address.id,
    })) ?? [];

  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<SaleOfferCreateFormInfoPanelFields>();

  const { saleOfferNotes: _, saleOfferProducts: __, ...restErrors } = errors;

  return (
    <div className="divide-y">
      <FormSection
        label="Müşteri Bilgileri"
        description="Bir müşteri seçin veya yeni müşteri ekleyin."
      >
        <FormDropdownInput<SaleOfferCreateFormInfoPanelFields>
          label="Müşteri"
          name="customerId"
          errors={restErrors}
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
          errors={restErrors}
        />
        <FormDateInput<SaleOfferCreateFormInfoPanelFields>
          id="endDate"
          label="Geçerlilik Tarihi"
          name="endDate"
          control={control}
          errors={restErrors}
        />
        <FormDropdownInput<SaleOfferCreateFormInfoPanelFields>
          label="Adres"
          name="addressId"
          errors={restErrors}
          control={control}
          options={formattedAddresses}
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
          errors={restErrors}
        />
        <FormInput<SaleOfferCreateFormInfoPanelFields>
          id="currency"
          label="Döviz Cinsi"
          name="currency"
          type="text"
          errors={restErrors}
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
          errors={restErrors}
          control={control}
          options={formattedCustomers}
        />
      </FormSection>
    </div>
  );
};
