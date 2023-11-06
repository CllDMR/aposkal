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
  companies: RouterOutputs["company"]["list"];
  addresses: RouterOutputs["address"]["list"];
}

export const SaleOfferCreateInfoPanel: FC<
  SaleOfferCreateFormInfoPanelProps
> = ({ companies: initialCompanies, addresses: initialAddresses }) => {
  const { data: companies } = api.company.list.useQuery(
    {},
    {
      initialData: initialCompanies,
    },
  );

  const formattedCompanies =
    companies?.map((company) => ({
      id: company.id,
      label: company.title,
      value: company.id,
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

  const { register, control } =
    useFormContext<SaleOfferCreateFormInfoPanelFields>();

  // const { saleOfferNotes: _, saleOfferProducts: __, ...restErrors } = errors;

  return (
    <div className="divide-y">
      <FormSection
        label="Müşteri Bilgileri"
        description="Bir müşteri seçin veya yeni müşteri ekleyin."
      >
        <FormDropdownInput<SaleOfferCreateFormInfoPanelFields>
          label="Müşteri"
          name="companyId"
          // errors={restErrors}
          control={control}
          options={formattedCompanies}
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
          // errors={restErrors}
        />
        <FormDateInput<SaleOfferCreateFormInfoPanelFields>
          id="endDate"
          label="Geçerlilik Tarihi"
          name="endDate"
          control={control}
          // errors={restErrors}
        />
        <FormDropdownInput<SaleOfferCreateFormInfoPanelFields>
          label="Adres"
          name="addressId"
          // errors={restErrors}
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
          // errors={restErrors}
        />
        <FormInput<SaleOfferCreateFormInfoPanelFields>
          id="currency"
          label="Döviz Cinsi"
          name="currency"
          type="text"
          // errors={restErrors}
          register={register}
        />
      </FormSection>

      <FormSection
        label="Proje Bilgileri"
        description="Maliyet ve karlılığı proje bazında takip etmek istiyorsanız bir proje seçin veya ekleyin. Zorunlu değildir."
      >
        <FormDropdownInput<SaleOfferCreateFormInfoPanelFields>
          label="Proje"
          name="companyId"
          // errors={restErrors}
          control={control}
          options={formattedCompanies}
        />
      </FormSection>
    </div>
  );
};
