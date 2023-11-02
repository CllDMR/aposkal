"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { companyUpdateInput } from "@acme/api/src/inputs/company";
import { Form, FormBottom } from "@acme/ui/atoms";
import {
  Button,
  FormCheckbox,
  FormDropdownInput,
  FormInput,
} from "@acme/ui/molecules";

import type { RouterInputs, RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

type CompanyEditFormFields = RouterInputs["company"]["update"];
type Company = NonNullable<RouterOutputs["company"]["get"]>;

interface CompanyEditFormProps {
  company: Company;
  addresses: RouterOutputs["address"]["list"];
}

export const CompanyEditForm: FC<CompanyEditFormProps> = ({
  company: initialCompany,
  addresses: initialAddresses,
}) => {
  const context = api.useContext();
  const [company] = api.company.get.useSuspenseQuery(
    { id: initialCompany.id },
    { initialData: initialCompany },
  );
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

  const { mutateAsync } = api.company.update.useMutation({
    async onSettled() {
      await context.company.list.invalidate();
      await context.company.get.invalidate();
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
  } = useForm<CompanyEditFormFields>({
    resolver: zodResolver(companyUpdateInput),
    defaultValues: companyUpdateInput.parse(company),
  });

  const onSubmit = handleSubmit(async (data) => {
    return await mutateAsync(data);
  });

  return (
    <Form onSubmit={onSubmit}>
      <FormInput<CompanyEditFormFields>
        id="title"
        label="Title"
        name="title"
        type="text"
        autoComplete="title"
        errors={errors}
        register={register}
      />
      <FormDropdownInput<CompanyEditFormFields>
        label="Type"
        name="type"
        errors={errors}
        control={control}
        options={[
          {
            id: "type_id_personal",
            label: "Personal",
            value: "personal",
          },
          {
            id: "type_id_limited",
            label: "Limited",
            value: "limited",
          },
          {
            id: "type_id_anonim",
            label: "Anonim",
            value: "anonim",
          },
          {
            id: "type_id_other",
            label: "Other",
            value: "other",
          },
        ]}
      />
      <FormDropdownInput<CompanyEditFormFields>
        label="Address"
        name="addressId"
        errors={errors}
        control={control}
        options={formattedAddresses}
      />
      <FormCheckbox<CompanyEditFormFields>
        id="isForeign"
        label="Is Foreign"
        name="isForeign"
        errors={errors}
        register={register}
      />
      <FormInput<CompanyEditFormFields>
        id="taxNo"
        label="Tax No"
        name="taxNo"
        type="text"
        autoComplete="taxNo"
        errors={errors}
        register={register}
      />
      <FormInput<CompanyEditFormFields>
        id="taxOffice"
        label="Tax Office"
        name="taxOffice"
        type="text"
        autoComplete="taxOffice"
        errors={errors}
        register={register}
      />
      <FormInput<CompanyEditFormFields>
        id="firmPhoneNumber"
        label="Firm Phone Number"
        name="firmPhoneNumber"
        type="text"
        autoComplete="firmPhoneNumber"
        errors={errors}
        register={register}
      />
      <FormInput<CompanyEditFormFields>
        id="qualifiedPhoneNumber"
        label="Qualified Phone Number"
        name="qualifiedPhoneNumber"
        type="text"
        autoComplete="qualifiedPhoneNumber"
        errors={errors}
        register={register}
      />
      <FormInput<CompanyEditFormFields>
        id="email"
        label="Email"
        name="email"
        type="text"
        autoComplete="email"
        errors={errors}
        register={register}
      />

      <FormBottom>
        <Button type="submit" disabled={isSubmitting}>
          Update
        </Button>
      </FormBottom>
    </Form>
  );
};