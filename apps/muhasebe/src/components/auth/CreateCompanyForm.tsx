"use client";

import type { FC } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { RouterInputs } from "@acme/api";
import { tenantCreateInput } from "@acme/api/src/inputs/tenant";
import { api } from "@acme/util";

import { Button, SelectField, Spinner, TextField } from "~/components/landing";

type TenantCreateFormFields = RouterInputs["tenant"]["create"];

interface CreateCompanyFormFields extends TenantCreateFormFields {
  commonError: string;
}

export const CreateCompanyForm: FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
    setError,
  } = useForm<CreateCompanyFormFields>({
    resolver: zodResolver(tenantCreateInput),
    defaultValues: {
      isForeign: false,
      type: "personal",
    },
  });

  const { mutateAsync } = api.tenant.create.useMutation({
    onError(error) {
      setError("commonError", {
        type: "server",
        message: error.message,
      });
    },
    onSuccess() {
      router.push("/auth/select-company");
      router.refresh();
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  const companyType = watch("type");

  if (errors) console.log({ errors });

  return (
    <form
      onSubmit={onSubmit}
      // onSubmit={() => alert("asd")}
      className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2"
    >
      <SelectField
        className="col-span-full"
        label="Firma Türü"
        {...register("type")}
      >
        <option value="personal">Şahıs Firması</option>
        <option value="limited">Limited Şirket</option>
        <option value="anonim">Anonim Şirket</option>
      </SelectField>

      <TextField
        id="title"
        name="title"
        className="col-span-full"
        label={companyType === "personal" ? "Ad Soyad" : "Şirket Ünvanı"}
        type="text"
        register={register}
      />

      <TextField
        id="taxNo"
        name="taxNo"
        label={companyType === "personal" ? "T.C. Kimlik No" : "Vergi No"}
        type="text"
        register={register}
        rules={{
          maxLength: companyType === "personal" ? 11 : 10,
          minLength: companyType === "personal" ? 11 : 10,
        }}
      />

      <TextField
        id="taxOffice"
        name="taxOffice"
        label="Vergi Dairesi"
        type="text"
        register={register}
      />

      {/* <TextField
        id="address"
        name="address"
        className="col-span-full"
        label="Adres"
        type="address"
        autoComplete="address"
        register={register}
      /> */}

      <TextField
        id="email"
        name="email"
        className="col-span-full"
        label="e-Posta"
        type="email"
        autoComplete="email"
        register={register}
      />

      <p className="col-span-full text-sm text-red-500">
        {errors.commonError?.message}
      </p>

      <div className="col-span-full">
        <Button
          type="submit"
          variant="solid"
          disabled={isSubmitting}
          color="blue"
          className="w-full disabled:opacity-50"
        >
          <span className="flex items-center justify-center">
            Yeni Firma Ekle <span aria-hidden="true">&rarr;</span>
            {isSubmitting && <Spinner />}
          </span>
        </Button>
      </div>
    </form>
  );
};
