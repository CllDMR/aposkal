"use client";

import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { addressCompanyUpdateInput } from "@acme/api/src/inputs/address/address_company";
import { Form, FormBottom } from "@acme/ui/atoms";
import { Button, FormInput } from "@acme/ui/molecules";

import type { RouterInputs, RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

type AddressCompanyEditFormFields = RouterInputs["addressCompany"]["update"];
type Address = NonNullable<RouterOutputs["addressCompany"]["get"]>;

export const AddressCompanyEditForm: FC<{ address: Address }> = ({
  address: initialAddress,
}) => {
  const context = api.useContext();
  const [address] = api.addressCompany.get.useSuspenseQuery(
    { id: initialAddress.id },
    { initialData: initialAddress },
  );

  const { mutateAsync } = api.addressCompany.update.useMutation({
    async onSettled() {
      await context.addressCompany.list.invalidate();
      await context.addressCompany.get.invalidate();
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<AddressCompanyEditFormFields>({
    resolver: zodResolver(addressCompanyUpdateInput),
    defaultValues: addressCompanyUpdateInput.parse(address),
  });

  const onSubmit = handleSubmit(async (data) => {
    return await mutateAsync(data);
  });

  return (
    <Form onSubmit={onSubmit}>
      <FormInput<AddressCompanyEditFormFields>
        id="name"
        label="Name"
        name="name"
        type="text"
        autoComplete="name"
        errors={errors}
        register={register}
      />
      <FormInput<AddressCompanyEditFormFields>
        id="city"
        label="City"
        name="city"
        type="text"
        autoComplete="city"
        errors={errors}
        register={register}
      />
      <FormInput<AddressCompanyEditFormFields>
        id="district"
        label="District"
        name="district"
        type="text"
        autoComplete="district"
        errors={errors}
        register={register}
      />
      <FormInput<AddressCompanyEditFormFields>
        id="street"
        label="Street"
        name="street"
        type="text"
        autoComplete="street"
        errors={errors}
        register={register}
      />
      <FormInput<AddressCompanyEditFormFields>
        id="country"
        label="Country"
        name="country"
        type="text"
        autoComplete="country"
        errors={errors}
        register={register}
      />
      <FormInput<AddressCompanyEditFormFields>
        id="state"
        label="State"
        name="state"
        type="text"
        autoComplete="state"
        errors={errors}
        register={register}
      />
      <FormInput<AddressCompanyEditFormFields>
        id="description"
        label="Description"
        name="description"
        type="text"
        autoComplete="description"
        errors={errors}
        register={register}
      />
      <FormInput<AddressCompanyEditFormFields>
        id="longAddressDescription"
        label="LongAddressDescription"
        name="longAddressDescription"
        type="text"
        autoComplete="longAddressDescription"
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
