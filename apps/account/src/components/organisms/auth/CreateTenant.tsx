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

import type { RouterInputs, RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

type CreateTenantFromFields = RouterInputs["tenant"]["create"];

interface CreateTenantProps {
  addresses: RouterOutputs["address"]["list"];
}

export const CreateTenant: FC<CreateTenantProps> = ({
  addresses: initialAddresses,
}) => {
  const context = api.useContext();
  const { mutateAsync } = api.tenant.create.useMutation({
    async onSettled() {
      await context.tenant.listOfUserTenants.invalidate();
      reset();
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
    reset,
    control,
  } = useForm<CreateTenantFromFields>({
    resolver: zodResolver(tenantCreateInput),
  });

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  return (
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
      <FormDropdownInput<CreateTenantFromFields>
        label="Address"
        name="addressId"
        errors={errors}
        control={control}
        options={formattedAddresses}
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

      <Button type="submit" disabled={isSubmitting}>
        Add Tenant
      </Button>
    </Form>
  );
};
