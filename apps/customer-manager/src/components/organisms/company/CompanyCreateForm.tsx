"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { companyCreateInput } from "@acme/api/src/inputs/company";
import { Form, FormBottom } from "@acme/ui/atoms";
import {
  Button,
  FormCheckbox,
  FormDropdownInput,
  FormInput,
} from "@acme/ui/molecules";

import type { RouterInputs, RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

type CompanyCreateFormFields = RouterInputs["company"]["create"];

interface CompanyCreateFormProps {
  addresses: RouterOutputs["address"]["list"];
}

export const CompanyCreateForm: FC<CompanyCreateFormProps> = ({
  addresses: initialAddresses,
}) => {
  const context = api.useContext();
  const { mutateAsync } = api.company.create.useMutation({
    async onSettled() {
      await context.company.list.invalidate();
    },
  });

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
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
  } = useForm<CompanyCreateFormFields>({
    resolver: zodResolver(companyCreateInput),
  });

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  return (
    <Form onSubmit={onSubmit}>
      <FormInput<CompanyCreateFormFields>
        id="title"
        label="Title"
        name="title"
        type="text"
        autoComplete="title"
        errors={errors}
        register={register}
      />
      <FormDropdownInput<CompanyCreateFormFields>
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
      <FormDropdownInput<CompanyCreateFormFields>
        label="Address"
        name="addressId"
        errors={errors}
        control={control}
        options={formattedAddresses}
      />
      <FormCheckbox<CompanyCreateFormFields>
        id="isForeign"
        label="Is Foreign"
        name="isForeign"
        errors={errors}
        register={register}
      />
      <FormInput<CompanyCreateFormFields>
        id="taxNo"
        label="Tax No"
        name="taxNo"
        type="text"
        autoComplete="taxNo"
        errors={errors}
        register={register}
      />
      <FormInput<CompanyCreateFormFields>
        id="taxOffice"
        label="Tax Office"
        name="taxOffice"
        type="text"
        autoComplete="taxOffice"
        errors={errors}
        register={register}
      />
      <FormInput<CompanyCreateFormFields>
        id="firmPhoneNumber"
        label="Firm Phone Number"
        name="firmPhoneNumber"
        type="text"
        autoComplete="firmPhoneNumber"
        errors={errors}
        register={register}
      />
      <FormInput<CompanyCreateFormFields>
        id="qualifiedPhoneNumber"
        label="Qualified Phone Number"
        name="qualifiedPhoneNumber"
        type="text"
        autoComplete="qualifiedPhoneNumber"
        errors={errors}
        register={register}
      />
      <FormInput<CompanyCreateFormFields>
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
          Create
        </Button>
      </FormBottom>
    </Form>
  );
};
