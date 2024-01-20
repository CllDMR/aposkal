"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import type { RouterInputs } from "@acme/api";
import { api } from "@acme/api-client";
import { companyCreateInput } from "@acme/api/src/inputs/company/company";
import { Form, FormBottom } from "@acme/ui/atoms";
import {
  Button,
  FormCheckbox,
  FormDropdownInput,
  FormInput,
} from "@acme/ui/molecules";

type CompanyCreateFormFields = RouterInputs["company"]["create"];

export const CompanyCreateForm: FC = () => {
  const utils = api.useUtils();
  const { mutateAsync } = api.company.create.useMutation({
    async onSettled() {
      await utils.company.list.invalidate();
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
  } = useForm<CompanyCreateFormFields>({
    resolver: zodResolver(companyCreateInput),
    defaultValues: {
      title: "Test Company - 1",
      type: "limited",
      isForeign: false,
      taxNo: "111111111",
      taxOffice: "Tax Office - 1",
      firmPhoneNumber: "+905312345678",
      qualifiedPhoneNumber: "+905312345678",
      email: "test-company-1@example.com",
      web: "test-company-1.com",
      ticaretSicilNo: "111111111",
      mersisNo: "111111111",
      addresses: [
        {
          name: "Company Address - 1",
          city: "İstanbul",
          district: "Şişli",
          street: "Çiçek",
          country: "Türkiye",
          state: "Türkiye",
          description: "Company Address Description - 1",
          longAddressDescription: "Company Address Long Description- 1",
        },
        {
          name: "Company Address - 2",
          city: "İstanbul",
          district: "Şişli",
          street: "Çiçek",
          country: "Türkiye",
          state: "Türkiye",
          description: "Company Address Description - 2",
          longAddressDescription: "Company Address Long Description- 2",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "addresses",
    control,
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
      <FormInput<CompanyCreateFormFields>
        id="web"
        label="Web"
        name="web"
        type="text"
        autoComplete="web"
        errors={errors}
        register={register}
      />
      <FormInput<CompanyCreateFormFields>
        id="ticaretSicilNo"
        label="Ticaret Sicil No"
        name="ticaretSicilNo"
        type="text"
        autoComplete="ticaretSicilNo"
        errors={errors}
        register={register}
      />
      <FormInput<CompanyCreateFormFields>
        id="mersisNo"
        label="Mersis No"
        name="mersisNo"
        type="text"
        autoComplete="mersisNo"
        errors={errors}
        register={register}
      />

      <Button
        type="button"
        onClick={() =>
          append({
            name: "Company Address - 1",
            city: "İstanbul",
            district: "Şişli",
            street: "Çiçek",
            country: "Türkiye",
            state: "Türkiye",
            description: "Company Address Description - 1",
            longAddressDescription: "Company Address Long Description- 1",
          })
        }
      >
        Add Address
      </Button>

      {fields.map(({ id }, index) => (
        <div
          key={id}
          className="col-span-1 flex gap-x-6 gap-y-4 space-x-2 py-4 sm:col-span-2 lg:col-span-3"
        >
          <FormInput<CompanyCreateFormFields>
            className="flex-1"
            id={`addresses.${index}.name`}
            label="Name"
            name={`addresses.${index}.name`}
            type="text"
            autoComplete="name"
            errors={errors}
            register={register}
          />
          <FormInput<CompanyCreateFormFields>
            className="flex-1"
            id={`addresses.${index}.city`}
            label="City"
            name={`addresses.${index}.city`}
            type="text"
            autoComplete="city"
            errors={errors}
            register={register}
          />
          <FormInput<CompanyCreateFormFields>
            className="flex-1"
            id={`addresses.${index}.district`}
            label="District"
            name={`addresses.${index}.district`}
            type="text"
            autoComplete="district"
            errors={errors}
            register={register}
          />
          <FormInput<CompanyCreateFormFields>
            className="flex-1"
            id={`addresses.${index}.street`}
            label="Street"
            name={`addresses.${index}.street`}
            type="text"
            autoComplete="street"
            errors={errors}
            register={register}
          />
          <FormInput<CompanyCreateFormFields>
            className="flex-1"
            id={`addresses.${index}.country`}
            label="Country"
            name={`addresses.${index}.country`}
            type="text"
            autoComplete="country"
            errors={errors}
            register={register}
          />
          <FormInput<CompanyCreateFormFields>
            className="flex-1"
            id={`addresses.${index}.state`}
            label="State"
            name={`addresses.${index}.state`}
            type="text"
            autoComplete="state"
            errors={errors}
            register={register}
          />
          <FormInput<CompanyCreateFormFields>
            className="flex-1"
            id={`addresses.${index}.description`}
            label="Description"
            name={`addresses.${index}.description`}
            type="text"
            autoComplete="description"
            errors={errors}
            register={register}
          />
          <FormInput<CompanyCreateFormFields>
            className="flex-1"
            id={`addresses.${index}.longAddressDescription`}
            label="LongAddressDescription"
            name={`addresses.${index}.longAddressDescription`}
            type="text"
            autoComplete="longAddressDescription"
            errors={errors}
            register={register}
          />

          <Button
            variant={Button.variant.ACCENT}
            type="button"
            onClick={() => {
              remove(index);
            }}
          >
            Remove
          </Button>
        </div>
      ))}

      <FormBottom>
        <Button type="submit" disabled={isSubmitting}>
          Create
        </Button>
      </FormBottom>
    </Form>
  );
};
