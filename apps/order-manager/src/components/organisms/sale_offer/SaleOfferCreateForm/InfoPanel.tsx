"use client";

import type { FC } from "react";
import { useFormContext } from "react-hook-form";

import type { RouterInputs, RouterOutputs } from "@acme/api";
import { api } from "@acme/api-client";
import { FormSection } from "@acme/ui/atoms";
import {
  FormDateInput,
  FormDropdownInput,
  FormInput,
} from "@acme/ui/molecules";

type SaleOfferCreateFormInfoPanelFields = RouterInputs["saleOffer"]["create"];

interface SaleOfferCreateFormInfoPanelProps {
  companies: RouterOutputs["company"]["list"]["companies"];
}

export const SaleOfferCreateInfoPanel: FC<
  SaleOfferCreateFormInfoPanelProps
> = ({ companies: initialCompanies }) => {
  const {
    register,
    control,
    formState: { errors },
    watch,
  } = useFormContext<SaleOfferCreateFormInfoPanelFields>();

  const companyId = watch("companyId");

  const {
    data: { companies },
  } = api.company.list.useQuery(
    {},
    {
      initialData: { companies: initialCompanies, totalCount: 0 },
    },
  );

  const formattedCompanies =
    companies?.map((company) => ({
      id: company.id,
      label: company.title,
      value: company.id,
    })) ?? [];

  const { data } = api.addressCompany.list.useQuery(
    {
      companyId:
        typeof companyId === "string" && !!companyId ? companyId : undefined,
    },
    {
      enabled: typeof companyId === "string" && !!companyId,
    },
  );

  const formattedAddresses =
    data?.addressCompanies?.map((address) => ({
      id: address.id,
      label: address.name,
      value: address.id,
    })) ?? [];

  return (
    <div className="divide-y">
      <FormSection
        label="Müşteri Bilgileri"
        description="Bir müşteri seçin veya yeni müşteri ekleyin."
      >
        <FormDropdownInput<SaleOfferCreateFormInfoPanelFields>
          label="Müşteri"
          name="companyId"
          errors={errors}
          control={control}
          options={formattedCompanies}
        />
        <FormDropdownInput<SaleOfferCreateFormInfoPanelFields>
          label="Adres"
          name="addressId"
          errors={errors}
          control={control}
          options={formattedAddresses}
          disabled={typeof companyId !== "string" || !companyId}
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

      {/* <FormSection
        label="Proje Bilgileri"
        description="Maliyet ve karlılığı proje bazında takip etmek istiyorsanız bir proje seçin veya ekleyin. Zorunlu değildir."
      >
        <FormDropdownInput<SaleOfferCreateFormInfoPanelFields>
          label="Proje"
          name="companyId"
          errors={errors}
          control={control}
          options={formattedCompanies}
        />
      </FormSection> */}
    </div>
  );
};
