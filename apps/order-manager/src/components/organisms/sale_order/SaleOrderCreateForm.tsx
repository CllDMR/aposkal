"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { saleOrderCreateInput } from "@acme/api/src/inputs/sale_order/sale_order";
import { Form, FormSection } from "@acme/ui/atoms";
import {
  FormDateInput,
  FormDropdownInput,
  FormInput,
} from "@acme/ui/molecules";
import { TabPanel } from "@acme/ui/organisms";

import type { RouterInputs, RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

type SaleOrderCreateFormFields = RouterInputs["saleOrder"]["create"];

interface SaleOrderCreateFormProps {
  companies: RouterOutputs["company"]["list"]["companies"];
  addresses: RouterOutputs["addressCompany"]["list"]["addressCompanies"];
}

export const SaleOrderCreateForm: FC<SaleOrderCreateFormProps> = ({
  companies: initialCompanies,
  addresses: initialAddresses,
}) => {
  const context = api.useContext();
  const { mutateAsync } = api.saleOrder.create.useMutation({
    async onSettled() {
      await context.saleOrder.list.invalidate();
    },
  });

  const { data: companies } = api.company.list.useQuery(
    {},
    {
      initialData: { companies: initialCompanies, totalCount: 0 },
    },
  );
  const { data: addresses } = api.addressCompany.list.useQuery(
    {},
    {
      initialData: { addressCompanies: initialAddresses, totalCount: 0 },
    },
  );

  const formattedCompanies =
    companies?.companies?.map((company) => ({
      id: company.id,
      label: company.title,
      value: company.id,
    })) ?? [];
  const formattedAddresses =
    addresses?.addressCompanies?.map((address) => ({
      id: address.id,
      label: address.name,
      value: address.id,
    })) ?? [];

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
  } = useForm<SaleOrderCreateFormFields>({
    resolver: zodResolver(saleOrderCreateInput),
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
            <FormInput<SaleOrderCreateFormFields>
              id="priority"
              label="Priority"
              name="priority"
              type="text"
              errors={errors}
              register={register}
            />
          </FormSection>

          <FormSection
            label="Teklif Bilgileri"
            description="Teklif tarihini giriniz. Teklif numarası otomatik olarak oluşturulacaktır."
          >
            <FormDateInput<SaleOrderCreateFormFields>
              id="startdate"
              label="Start Date"
              name="startdate"
              control={control}
              errors={errors}
            />
            <FormDateInput<SaleOrderCreateFormFields>
              id="enddate"
              label="End Date"
              name="enddate"
              control={control}
              errors={errors}
            />
          </FormSection>

          <FormSection
            label="Ödeme Bilgileri"
            description="Ödeme vadesi ve varsa döviz cinsini giriniz."
          >
            <FormDropdownInput<SaleOrderCreateFormFields>
              label="Company"
              name="companyId"
              errors={errors}
              control={control}
              options={formattedCompanies}
            />
            <FormDropdownInput<SaleOrderCreateFormFields>
              label="Address"
              name="addressId"
              errors={errors}
              control={control}
              options={formattedAddresses}
            />
            <FormInput<SaleOrderCreateFormFields>
              id="companyType"
              label="Company Type"
              name="companyType"
              type="text"
              errors={errors}
              register={register}
            />
            <FormInput<SaleOrderCreateFormFields>
              id="source"
              label="Source"
              name="source"
              type="text"
              errors={errors}
              register={register}
            />
          </FormSection>

          <FormSection
            label="Proje Bilgileri"
            description="Maliyet ve karlılığı proje bazında takip etmek istiyorsanız bir proje seçin veya ekleyin. Zorunlu değildir."
          >
            <FormDropdownInput<SaleOrderCreateFormFields>
              label="Company"
              name="companyId"
              errors={errors}
              control={control}
              options={formattedCompanies}
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
