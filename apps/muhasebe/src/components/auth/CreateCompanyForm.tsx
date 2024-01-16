"use client";

import type { FC } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button, SelectField, Spinner, TextField } from "~/components/landing";
import { api } from "~/utils/api";
import { createCompanySchema } from "~/validationSchemas";

interface CreateCompanyFormFields {
  companyType: "personal" | "anonim" | "limited" | "other";
  title: string;
  vknTckn: string;
  taxOffice: string;
  mersisNo: string;
  address: string;
  email: string;
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
    resolver: zodResolver(createCompanySchema),
  });

  const { mutateAsync } = api.company.create.useMutation({
    onError(error) {
      setError("commonError", {
        type: "server",
        message: error.message,
      });
    },
    onSuccess() {
      router.push("/dashboard");
      router.refresh();
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync({
      email: data.email,
      type: data.companyType,
      addresses: [],
      firmPhoneNumber: "",
      isForeign: false,
      mersisNo: data.mersisNo,
      qualifiedPhoneNumber: "",
      taxNo: data.vknTckn, // ?? emin değilim
      taxOffice: data.taxOffice,
      ticaretSicilNo: "",
      title: data.title,
      web: "",
    });
  });

  const companyType = watch("companyType");

  return (
    <form
      onSubmit={onSubmit}
      className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2"
    >
      <SelectField
        className="col-span-full"
        label="Firma Türü"
        {...register("companyType")}
      >
        <option></option>
        <option value="personal">Şahıs Firması</option>
        <option value="limited">Limited Şirket</option>
        <option value="anonim">Anonim Şirket</option>
      </SelectField>

      <TextField
        id="title"
        className="col-span-full"
        label={companyType === "personal" ? "Ad Soyad" : "Şirket Ünvanı"}
        type="text"
        {...register("title")}
      />

      <TextField
        id="vknTckn"
        label={companyType === "personal" ? "T.C. Kimlik No" : "Vergi No"}
        type="text"
        {...register("vknTckn")}
      />

      <TextField
        id="taxOffice"
        label="Vergi Dairesi"
        type="text"
        {...register("taxOffice")}
      />

      <TextField
        id="address"
        className="col-span-full"
        label="Adres"
        type="address"
        autoComplete="address"
        {...register("address")}
      />

      <TextField
        id="email"
        className="col-span-full"
        label="e-Posta"
        type="email"
        autoComplete="email"
        {...register("email")}
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