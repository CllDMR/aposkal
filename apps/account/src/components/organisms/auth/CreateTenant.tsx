"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { tenantCreateInput } from "@acme/api/src/inputs/tenant";
import { Form } from "@acme/ui/atoms";
import {
  Button,
  FormCheckbox,
  FormDropdownInput,
  FormInput,
} from "@acme/ui/molecules";

import type { RouterInputs } from "~/utils/api";
import { api } from "~/utils/api";

type CreateTenantFromFields = RouterInputs["tenant"]["create"];

export const CreateTenant: FC = () => {
  const context = api.useContext();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<CreateTenantFromFields>({
    resolver: zodResolver(tenantCreateInput),
  });

  const { mutateAsync } = api.tenant.create.useMutation({
    async onSettled() {
      await context.tenant.listOfUserTenants.invalidate();
      reset();
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  return (
    <>
      <Form className="" onSubmit={onSubmit}>
        <FormInput<CreateTenantFromFields>
          id="title"
          label="Title"
          name="title"
          type="text"
          autoComplete="title"
          errors={errors}
          register={register}
        />

        <FormDropdownInput<CreateTenantFromFields>
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
        <FormInput<CreateTenantFromFields>
          id="address.name"
          label="Address Name"
          name="address.name"
          type="text"
          errors={errors}
          register={register}
        />
        <FormInput<CreateTenantFromFields>
          id="address.country"
          label="Address Country"
          name="address.country"
          type="text"
          errors={errors}
          register={register}
        />
        <FormInput<CreateTenantFromFields>
          id="address.state"
          label="Address State"
          name="address.state"
          type="text"
          errors={errors}
          register={register}
        />
        <FormInput<CreateTenantFromFields>
          id="address.city"
          label="Address City"
          name="address.city"
          type="text"
          errors={errors}
          register={register}
        />
        <FormInput<CreateTenantFromFields>
          id="address.district"
          label="Address District"
          name="address.district"
          type="text"
          errors={errors}
          register={register}
        />
        <FormInput<CreateTenantFromFields>
          id="address.street"
          label="Address Street"
          name="address.street"
          type="text"
          errors={errors}
          register={register}
        />
        <FormInput<CreateTenantFromFields>
          id="address.description"
          label="Address Description"
          name="address.description"
          type="text"
          errors={errors}
          register={register}
        />
        <FormInput<CreateTenantFromFields>
          id="address.longAddressDescription"
          label="Address LongAddressDescription"
          name="address.longAddressDescription"
          type="text"
          errors={errors}
          register={register}
        />
        <FormCheckbox<CreateTenantFromFields>
          id="isForeign"
          label="Is Foreign"
          name="isForeign"
          errors={errors}
          register={register}
        />
        <FormInput<CreateTenantFromFields>
          id="taxNo"
          label="Tax No"
          name="taxNo"
          type="text"
          autoComplete="taxNo"
          errors={errors}
          register={register}
        />
        <FormInput<CreateTenantFromFields>
          id="taxOffice"
          label="Tax Office"
          name="taxOffice"
          type="text"
          autoComplete="taxOffice"
          errors={errors}
          register={register}
        />
        <FormInput<CreateTenantFromFields>
          id="firmPhoneNumber"
          label="Firm Phone Number"
          name="firmPhoneNumber"
          type="text"
          autoComplete="firmPhoneNumber"
          errors={errors}
          register={register}
        />
        <FormInput<CreateTenantFromFields>
          id="qualifiedPhoneNumber"
          label="Qualified Phone Number"
          name="qualifiedPhoneNumber"
          type="text"
          autoComplete="qualifiedPhoneNumber"
          errors={errors}
          register={register}
        />
        <FormInput<CreateTenantFromFields>
          id="email"
          label="Email"
          name="email"
          type="text"
          autoComplete="email"
          errors={errors}
          register={register}
        />
        <FormInput<CreateTenantFromFields>
          id="web"
          label="Web"
          name="web"
          type="text"
          autoComplete="web"
          errors={errors}
          register={register}
        />
        <FormInput<CreateTenantFromFields>
          id="ticaretSicilNo"
          label="Ticaret Sicil No"
          name="ticaretSicilNo"
          type="text"
          autoComplete="ticaretSicilNo"
          errors={errors}
          register={register}
        />
        <FormInput<CreateTenantFromFields>
          id="mersisNo"
          label="Mersis No"
          name="mersisNo"
          type="text"
          autoComplete="mersisNo"
          errors={errors}
          register={register}
        />

        <Button type="submit" disabled={isSubmitting}>
          Add Tenant
        </Button>
      </Form>
    </>
  );
};
